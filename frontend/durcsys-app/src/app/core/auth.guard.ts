import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  canActivate(): boolean {
    let authResponse = this.authService.getAuthResponse();

    if (!authResponse) {
      this.router.navigate(['login']);
      return false;
    }

    if (!authResponse.token) {
      this.messageService.add({severity: 'warn', summary: 'Atenção', detail: "Você não tem permissão para acessar essa página!"});
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
