import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UsuarioDto} from '../../../../dtos/usuario.dto';
import {FormBuilder} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {UsuariosService} from '../usuarios.service';
import {LoadingService} from '../../../../shared/services/loading.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.scss'
})
export class UsuarioEditComponent implements OnInit {

  private destroy$ = new Subject();

  instance: DynamicDialogComponent | undefined;
  usuario: UsuarioDto = {} as UsuarioDto;

  formUsuario: any;

  constructor(
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private usuarioService: UsuariosService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance.data) {

      this.usuario = this.instance.data['usuario'];
    }

    this.formUsuario = this.formBuilder.group({
      nome: [this.usuario.nome],
      email: [this.usuario.email],
    });
  }

  fechar() {
    this.ref.close(this.usuario);
  }

  salvar() {
    this.loadingService.start('Atualizando usuário...');

    const usuario = this.formUsuario.getRawValue() as UsuarioDto;
    usuario.id = this.usuario.id;

    this.usuarioService.update(usuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {

        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso!'});
        this.ref.close(usuario);

      },
      error: (error) => {
        this.confirmService.confirm({
          header: 'Erro ao atualizar usuário',
          message: error.error.message,
          accept: () => {
            this.loadingService.done();
          }
        });
      }
    }).add(() => this.loadingService.done());
  }
}
