import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchquestionPageRoutingModule } from './searchquestion-routing.module';

import { SearchquestionPage } from './searchquestion.page';
import { QuestionSkelTextComponent } from '../../../core/components/layouts/question-skel-text/question-skel-text.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchquestionPageRoutingModule,
  ],
  declarations: [SearchquestionPage, QuestionSkelTextComponent]
})
export class SearchquestionPageModule { }
