import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponseduePageRoutingModule } from './responsedue-routing.module';

import { ResponseduePage } from './responsedue.page';

import { QuillModule } from 'ngx-quill';
import { QuestionSkelTextComponent } from '../../../core/components/layouts/question-skel-text/question-skel-text.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponseduePageRoutingModule,
    QuillModule,
  ],
  declarations: [ResponseduePage, QuestionSkelTextComponent]
})
export class ResponseduePageModule { }
