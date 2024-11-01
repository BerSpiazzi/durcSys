import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from "./components/loading/loading.component";
import {LoadingService} from "./services/loading.service";
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {MenuModule} from 'primeng/menu';
import {SpeedDialModule} from 'primeng/speeddial';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {RippleModule} from 'primeng/ripple';
import {InputTextValidationComponent} from './components/input/input-text-validation.component';
import {EmptyTableComponent} from './components/empty-table/empty-table.component';

@NgModule({
  declarations: [
    LoadingComponent,
    InputTextValidationComponent,
    EmptyTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
    InputTextModule,
    RippleModule,
    NgOptimizedImage,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    LoadingComponent,
    InputTextValidationComponent,
    EmptyTableComponent,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        LoadingService,
        MessageService,
        ConfirmationService,
        DialogService,
      ]
    };
  }

}
