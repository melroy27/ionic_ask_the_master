import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewresponsePageRoutingModule } from './newresponse-routing.module';

import { NewresponsePage } from './newresponse.page';
import { QuestionSkelTextComponent } from '../../../core/components/layouts/question-skel-text/question-skel-text.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewresponsePageRoutingModule
  ],
  declarations: [NewresponsePage, QuestionSkelTextComponent]
})
export class NewresponsePageModule { }
