import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginUserDto} from '../../dtos/login-user.dto';
import {RegisterUserDto} from '../../dtos/register-user.dto';
import {AuthResponseDto} from '../../dtos/auth-response.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL_API = environment.api_url;

  constructor(
    private http: HttpClient,
  ) {
  }

  authUser(authRequest: LoginUserDto): Observable<any> {
    return this.http.post<AuthResponseDto>(`${this.URL_API}/auth/login`, authRequest);
  }

  register(usuarioDto: RegisterUserDto): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/auth/signup`, usuarioDto);

  }
}
