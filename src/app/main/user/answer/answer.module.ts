import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerPageRoutingModule } from './answer-routing.module';

import { AnswerPage } from './answer.page';
import { QuillModule } from 'ngx-quill';
import { TypeOfPipe } from 'src/app/core/pipes/type-of.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerPageRoutingModule,
    QuillModule
  ],
  declarations: [AnswerPage, TypeOfPipe]
})
export class AnswerPageModule { }
