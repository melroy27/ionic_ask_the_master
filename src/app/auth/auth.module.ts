import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { ForgotComponent } from './forgot/forgot.component';
import { CheckotpComponent } from './checkotp/checkotp.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [AuthPage, ForgotComponent, CheckotpComponent, ResetComponent],
  entryComponents: [ForgotComponent, CheckotpComponent, ResetComponent]
})
export class AuthPageModule { }
