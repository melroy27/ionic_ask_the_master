import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchquestionPage } from './searchquestion.page';

const routes: Routes = [
  {
    path: '',
    component: SearchquestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchquestionPageRoutingModule {}
