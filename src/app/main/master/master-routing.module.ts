import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterPage } from './master.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MasterPage,
    children: [
      {
        path: 'responsedue',
        children: [
          {
            path: '',
            loadChildren: () => import('./responsedue/responsedue.module').then(m => m.ResponseduePageModule)
          }, {
            path: ':postId',
            loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
          }
        ]
      },
      {
        path: 'searchquestion',
        children: [
          {
            path: '',
            loadChildren: () => import('./searchquestion/searchquestion.module').then(m => m.SearchquestionPageModule)
          },
          {
            path: ':postId',
            loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
          }
        ]
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackPageModule)
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
        redirectTo: '/main/master/tabs/responsedue',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/master/tabs/responsedue',
    pathMatch: 'full'
  },
  {
    path: 'answer',
    loadChildren: () => import('./answer/answer.module').then(m => m.AnswerPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPageRoutingModule { }
