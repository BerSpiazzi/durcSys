import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioDto} from '../../../dtos/usuario.dto';
import {RegisterUserDto} from '../../../dtos/register-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly URL_USUARIOS = environment.api_url + '/usuarios';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAll(idUsuario: number): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${this.URL_USUARIOS}/${idUsuario}`);
  }

  update(usuario: UsuarioDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.URL_USUARIOS}`, usuario);
  }

  register(usuario: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.URL_USUARIOS}`, usuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL_USUARIOS}/${id}`);
  }

}
