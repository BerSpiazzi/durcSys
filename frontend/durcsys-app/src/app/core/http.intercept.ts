import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {AuthService} from './auth.service';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let headers = request.headers;
    headers = headers.set('Content-Type', 'application/json');

    let authResponse = this.authService.getAuthResponse();
    if (authResponse) {
      headers = headers.set('Authorization', `Bearer ${authResponse.token}`);
    }

    request = request.clone({
      headers: headers
    });

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err.status === 403 || err.status === 401) {
      if (this.authService.check()) {
        this.confirmationService.confirm({
          header: 'Sessão Inválida',
          message: 'Se necessário, limpe os cookies do navegador',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'OK',
          rejectVisible: false,
          accept: () => {
            this.authService.logout();
          }
        });
        return of();
      } else {
        this.confirmationService.confirm({
          message: 'Usuário não Cadastrado OU Usuário e/ou senha inválidos',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'OK',
          rejectVisible: false,
        });
        return of();
      }
    }

    if (err.status === 422) {
      this.confirmationService.confirm({
        message: err.error.errorFields.map((e: any) => e.error).join('\n'),
        icon: 'pi pi-times',
        acceptLabel: 'OK',
        rejectVisible: false,
      });
      return of();
    }

    if (err.status === 0 || err.statusText === 'Unknown Error') {
      this.confirmationService.confirm({
        message: 'Servidor indisponível',
        icon: 'pi pi-times',
        acceptLabel: 'OK',
        rejectVisible: false,
      });
      return of();
    }

    return throwError(() => new Error(err.error.message));
  }
}
