import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginUserDto} from '../../dtos/login-user.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL_API = environment.api_url;

  private readonly URL_API_ACESSO_REPRESENTANTE = this.URL_API + '/acesso';

  constructor(
    private http: HttpClient,
  ) {
  }

  authUser(authRequest: LoginUserDto): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/auth/login`, authRequest);
  }

  register(representanteRequest: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API_ACESSO_REPRESENTANTE}/auth/register`, representanteRequest);

  }
}
