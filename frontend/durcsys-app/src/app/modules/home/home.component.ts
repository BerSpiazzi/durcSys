import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../core/auth.service';
import {LayoutService} from '../../shared/services/layout.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {UsuarioDto} from '../../dtos/usuario.dto';
import {getRows, getRowsPerPageOptions} from '../../shared/utils/table.utils';
import {LoadingService} from '../../shared/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private destroy$ = new Subject();
  protected readonly environment = environment;

  @ViewChild('topbarmenu') menu!: ElementRef;

  activeComponent: any;
  title: string = 'Lista de Usuários';
  showIncluir = true;

  constructor(
    protected authService: AuthService,
    protected layoutService: LayoutService,
    private cookieService: CookieService,
    private loadingService: LoadingService,
  ) {
    this.layoutService.titleChange$.pipe(takeUntil(this.destroy$)).subscribe(title => {
      setTimeout(() => {
        this.title = title;
      });
    });

  }

  ngOnInit(): void {

    if (this.cookieService.get('theme')) {
      this.layoutService.config = JSON.parse(this.cookieService.get('theme'));
      this.aplyTheme(this.layoutService.config.colorScheme);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple
    }
  }

  changeTheme() {
    const theme = this.layoutService.config.colorScheme === 'dark' ? 'light' : 'dark';
    this.aplyTheme(theme);
  }

  private aplyTheme(theme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    let newHref = themeLink.getAttribute('href')!;
    newHref = newHref.replace('dark', theme);
    newHref = newHref.replace('light', theme);
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = theme;
      this.cookieService.set('theme', JSON.stringify(this.layoutService.config));
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  onActivate($event: any) {
    this.activeComponent = $event;
    this.title = $event.title;
    this.showIncluir = $event.showIncluir;
  }

  novo() {
    this.activeComponent.novo();
  }

  protected readonly getRows = getRows;
  protected readonly getRowsPerPageOptions = getRowsPerPageOptions;


}
