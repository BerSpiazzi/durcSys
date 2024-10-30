import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../../../shared/validators/email-validator';
import {passwordValidator} from '../../../../shared/validators/password-validator';
import {LoadingService} from '../../../../shared/services/loading.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UsuariosService} from '../usuarios.service';
import {Subject, takeUntil} from 'rxjs';
import {RegisterUserDto} from '../../../../dtos/register-user.dto';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrl: './usuario-novo.component.scss'
})
export class UsuarioNovoComponent implements OnInit {

  showSalvar = true;
  showVoltar = true;
  title = 'Novo Usuário';

  private destroy$ = new Subject();
  usuarioForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private usuarioService: UsuariosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      email: ['', emailValidator()],
      nome: ['', Validators.required],
      senha: ['', passwordValidator()],
      confirmSenha: ['', Validators.required]
    });

  }

  salvar(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    if (this.usuarioForm.value.senha !== this.usuarioForm.value.confirmSenha) {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Senhas não conferem!'});
      return;
    }

    this.loading.start('Salvando...');

    const usuario = this.usuarioForm.value as RegisterUserDto;

    this.usuarioService.register(usuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!'});
          this.router.navigate(['admin/home/usuarios']);
        }
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Erro no Cadastro', detail: err});
      }
    }).add(() => this.loading.done());
  }

  voltar(): void {
    this.router.navigate(['admin/home/usuarios']);
  }

}
