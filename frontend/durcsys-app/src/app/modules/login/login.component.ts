import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from '../../shared/validators/password-validator';
import {Subject, takeUntil} from 'rxjs';
import {LoginUserDto} from '../../dtos/login-user.dto';
import {LoadingService} from '../../shared/services/loading.service';
import {LoginService} from './login.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RegisterUserDto} from '../../dtos/register-user.dto';
import {emailValidator} from '../../shared/validators/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private destroy$ = new Subject();

  loginForm: any;
  registerFormGroup: any;
  usuarioDto: RegisterUserDto = {} as RegisterUserDto;

  showStepper = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private loading: LoadingService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', Validators.required]
    });

    this.registerFormGroup = this._formBuilder.group({
      email: ['', emailValidator()],
      nome: ['', Validators.required],
      senha: ['', passwordValidator()],
      confirmSenha: ['', Validators.required]
    });
  }

  entrar(): void {
    this.loading.start('Entrando...');

    this.loginService.authUser(this.loginForm.value as LoginUserDto)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.authService.setAuthResponse(response);
          this.router.navigate(['/home/usuarios']);
        }
      },
      error: (error) => {
        this.confirmationService.confirm({
          message: error.error.message,
          icon: 'pi pi-times',
          acceptLabel: 'OK',
          rejectVisible: false,
        });
      }
    }).add(() => this.loading.done());
  }

  registrar() {

    if (this.registerFormGroup.invalid) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: "Campos obrigatórios não preenchidos!"});
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    if (this.registerFormGroup.value.senha !== this.registerFormGroup.value.confirmSenha) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: "As senhas não conferem!"});
      return;
    }

    this.usuarioDto = this.registerFormGroup.value as RegisterUserDto;

    this.loading.start('Cadastrando Usuário...');

    this.loginService.register(this.usuarioDto)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response) {
          this.confirmationService.confirm({
            message: "Cadastro realizado com sucesso!",
            icon: 'pi pi-check',
            acceptLabel: 'OK',
            rejectVisible: false,
          });
          this.showStepper = false;
        }
      },
      error: (error) => {
        this.confirmationService.confirm({
          message: error.message,
          icon: 'pi pi-times',
          acceptLabel: 'OK',
          rejectVisible: false,
        });
      }
    }).add(() => this.loading.done());
  }

  protected readonly environment = environment;

  ngOnInit(): void {
  }

  openStepRegistro() {

    this.showStepper = true;
  }
}
