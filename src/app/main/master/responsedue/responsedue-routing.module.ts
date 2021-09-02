import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseduePage } from './responsedue.page';

const routes: Routes = [
  {
    path: '',
    component: ResponseduePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponseduePageRoutingModule {}
