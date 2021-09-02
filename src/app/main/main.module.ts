import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { QuillModule } from 'ngx-quill';
import { QuestionSkelTextComponent } from '../core/components/layouts/question-skel-text/question-skel-text.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    QuillModule,
  ],
  declarations: [QuestionSkelTextComponent,],
  exports: []
})
export class MainPageModule { }
