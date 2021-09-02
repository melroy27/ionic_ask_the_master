import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
          },
          {
            path: ':postId',
            loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
          },
          {
            path: 'view/:postId',
            loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
          },
        ]
      },
      {
        path: 'newresponse',
        children: [
          {
            path: '',
            loadChildren: () => import('./newresponse/newresponse.module').then(m => m.NewresponsePageModule)
          },
          {
            path: ':postId',
            loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
          }
        ]
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: '',
        redirectTo: '/main/user/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/user/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
