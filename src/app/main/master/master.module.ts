import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';
import { QuillModule } from 'ngx-quill';
import { WriteAnswerComponent } from './responsedue/write-answer/write-answer.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuillModule,
    MasterPageRoutingModule,
  ],
  declarations: [MasterPage,  WriteAnswerComponent],
  exports: [ WriteAnswerComponent]
})
export class MasterPageModule { }
