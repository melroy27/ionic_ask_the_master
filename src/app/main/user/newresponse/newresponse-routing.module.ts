import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewresponsePage } from './newresponse.page';

const routes: Routes = [
  {
    path: '',
    component: NewresponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewresponsePageRoutingModule {}
