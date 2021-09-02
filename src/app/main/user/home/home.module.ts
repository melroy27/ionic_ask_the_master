import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { QuillModule } from 'ngx-quill';
import { QuestionSkelTextComponent } from '../../../core/components/layouts/question-skel-text/question-skel-text.component';
import { QuestionLayoutComponent } from '../../../core/components/layouts/question-layout/question-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QuillModule,
  ],
  declarations: [HomePage, QuestionSkelTextComponent, QuestionLayoutComponent],
  exports: [],

})
export class HomePageModule { }
