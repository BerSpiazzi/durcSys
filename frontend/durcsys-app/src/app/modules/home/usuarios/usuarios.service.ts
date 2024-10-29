import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioDto} from '../../../dtos/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly URL_USUARIOS = environment.api_url + '/usuarios';

  constructor(
    private http: HttpClient,
  ) {
  }

  findAll(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.URL_USUARIOS);
  }

  update(usuario: UsuarioDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.URL_USUARIOS}`, usuario);
  }

  findByEmail(email: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.URL_USUARIOS}/email/${email}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.URL_USUARIOS}/${id}`);
  }

}
