import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { DomainComponent } from './home/domain/domain.component';
import { CategoryComponent } from './home/category/category.component';
import { SubcategoryComponent } from './home/subcategory/subcategory.component';
import { CarComponent } from './home/car/car.component';
import { QuestionComponent } from './home/question/question.component';
import { DynatextComponent } from '../../shared/components/dynatext/dynatext.component';
import { DynacameraComponent } from '../../shared/components/dynacamera/dynacamera.component';
import { DynapdfComponent } from '../../shared/components/dynapdf/dynapdf.component';

import { QuillModule } from 'ngx-quill';
import { FilterComponent } from './home/filter/filter.component';
import { RatingComponent } from './answer/rating/rating.component';
import { QuestionSkelTextComponent } from 'src/app/core/components/layouts/question-skel-text/question-skel-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserPageRoutingModule,
    QuillModule,
  ],
  declarations: [UserPage, DomainComponent, CategoryComponent, SubcategoryComponent, CarComponent, QuestionComponent, DynatextComponent, DynacameraComponent, DynapdfComponent, FilterComponent, RatingComponent, QuestionSkelTextComponent],
  exports: [DomainComponent, CategoryComponent, SubcategoryComponent, CarComponent, QuestionComponent, FilterComponent, RatingComponent,],
})
export class UserPageModule { }
