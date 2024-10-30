import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthResponseDto} from '../dtos/auth-response.dto';
import {CookieService} from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private keyCrypt = "##durc-sys-2024##";

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

  setAuthResponse(authResponse: AuthResponseDto): void {

    var encryptCookie = CryptoJS.AES.encrypt(JSON.stringify(authResponse), this.keyCrypt, {
      keySize: 16,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    this.cookieService.set('durc-sys-2024-auth', encryptCookie.toString(), {secure: true});
  }

  getAuthResponse(): AuthResponseDto | null {
    let auth = this.cookieService.get('durc-sys-2024-auth');
    if (!auth) {
      return null;
    }

    var decryptedCookie = CryptoJS.AES.decrypt(
      auth, this.keyCrypt, {
        keySize: 16,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedCookie) as AuthResponseDto;
  }

  check() {
    return this.cookieService.check('durc-sys-2024-auth');
  }

  delete() {
    this.cookieService.delete('durc-sys-2024-auth');
  }

  logout(): void {
    this.delete();
    this.router.navigate(['/admin/login'])
  }

}
