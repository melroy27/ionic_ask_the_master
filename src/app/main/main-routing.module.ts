import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RouteGuard } from '../core/guards/route.guard';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'master',
    loadChildren: () => import('./master/master.module').then(m => m.MasterPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule),
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
