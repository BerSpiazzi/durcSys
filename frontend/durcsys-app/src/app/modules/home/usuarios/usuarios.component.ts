import {Component, OnInit} from '@angular/core';
import {getRows, getRowsPerPageOptions} from '../../../shared/utils/table.utils';
import {LoadingService} from '../../../shared/services/loading.service';
import {UsuariosService} from './usuarios.service';
import {Subject, takeUntil} from 'rxjs';
import {UsuarioDto} from '../../../dtos/usuario.dto';
import {ConfirmationService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UsuarioEditComponent} from './edit/usuario-edit.component';
import {AuthService} from '../../../core/auth.service';
import {LayoutService} from '../../../shared/services/layout.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  title: string = 'Lista de Usuários';

  private destroy$ = new Subject();

  protected readonly getRowsPerPageOptions = getRowsPerPageOptions;
  protected readonly getRows = getRows;

  showIncluir = true;

  ref: DynamicDialogRef | undefined;

  listUsuarios: UsuarioDto[] = [];

  constructor(
    private loadingService: LoadingService,
    private usuarioService: UsuariosService,
    private confirmService: ConfirmationService,
    private dialogService: DialogService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.layoutService.titleChange$.pipe(takeUntil(this.destroy$)).subscribe(title => {
      setTimeout(() => {
        this.title = title;
      });
    });
  }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  private buscarUsuarios() {
    const idUsuario = this.authService.getAuthResponse()?.idUsuario!;

    this.loadingService.start('Carregando usuários...');
    console.log(idUsuario)
    this.usuarioService.findAll(idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.listUsuarios = response;
      },
      error: (error) => {
        this.confirmService.confirm({
          header: 'Erro ao buscar usuários',
          message: error.error.message,
          accept: () => {
            this.loadingService.done();
          }
        });
      }
    }).add(() => this.loadingService.done());
  }


  excluir(usuario: any) {

    this.confirmService.confirm({
      header: 'Confirmação de exclusão',
      message: 'Deseja realmente excluir o usuário?',
      accept: () => {
        this.loadingService.start('Excluindo usuário...');

        this.usuarioService.delete(usuario.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {

            this.buscarUsuarios();

          },
          error: (error) => {
            this.confirmService.confirm({
              header: 'Erro ao excluir usuário',
              message: error.error.message,
              accept: () => {
                this.loadingService.done();
              }
            });
          }
        }).add(() => this.loadingService.done());
      }
    });
  }

  openModalEdicao(usuario: any) {

    this.ref = this.dialogService.open(UsuarioEditComponent, {
      data: {
        usuario
      },
      header: 'Edição de usuário',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
    });

    this.ref.onClose.subscribe((response) => {
      if (response) {
        this.buscarUsuarios();
      }
    });

  }

  novo() {
    this.router.navigate(['./novo'], {relativeTo: this.route});
  }
}
