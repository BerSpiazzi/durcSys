import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login.component';
import {LoginRountingModule} from './login-rounting.module';
import {LoginService} from './login.service';
import {NgOptimizedImage} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {StepsModule} from "primeng/steps";
import {InputOtpModule} from "primeng/inputotp";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    LoginRountingModule,
    NgOptimizedImage,
    Ripple,
    StepsModule,
    InputOtpModule,
  ],
  providers: [
    LoginService,
  ],
  exports: []
})
export class LoginModule {
}
