import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../core/auth.service';
import {LayoutService} from '../../shared/services/layout.service';
import {environment} from '../../../environments/environment';

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
  showIncluir = false;
  showSalvar = false;
  showVoltar = false;

  constructor(
    protected authService: AuthService,
    protected layoutService: LayoutService,
  ) {
    this.layoutService.titleChange$.pipe(takeUntil(this.destroy$)).subscribe(title => {
      setTimeout(() => {
        this.title = title;
      });
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  get containerClass() {
    return {
      'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple
    }
  }

  onActivate($event: any) {
    this.activeComponent = $event;
    this.title = $event.title;
    this.showIncluir = $event.showIncluir;
    this.showSalvar = $event.showSalvar;
    this.showVoltar = $event.showVoltar;
  }

  novo() {
    this.activeComponent.novo();
  }

  salvar() {
    this.activeComponent.salvar();
  }

  voltar() {
    this.activeComponent.voltar();
  }

}
