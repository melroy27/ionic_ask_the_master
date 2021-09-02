import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, finalize, isEmpty, map, retryWhen, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { EMPTY, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IonicComponent } from '../components/ionic-component';
import { LocalStorage } from '../storage/local-storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,
        private loadingCtrl: LoadingController,
        private toastCrtl: ToastController,
        private alertCtrl: AlertController,
        public IonicComp: IonicComponent,
        public lclStr: LocalStorage
    ) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     console.log('Entered',req.url)
    //     if (req.url.match('/question')) {
    //         console.log('Entered should work')
    //         return next.handle(req)
    //     } else {
    //         this.loadingCtrl.getTop().then(hasLoading => {
    //             if (!hasLoading) {
    //                 this.loadingCtrl.create({
    //                     spinner: 'circular',
    //                     translucent: true,
    //                     id: 'interceptor'
    //                 }).then(loading => loading.present());
    //             }
    //         });
    //     }

    //     if (req.headers.get('noauth')) {
    //         return next.handle(req.clone());
    //     }
    //     else {
    //         const clonedreq = req.clone({
    //             headers: req.headers
    //                 .set('Authorization', 'Bearer ' + this.lclStr.getToken())
    //                 .set('Content-Type', 'application/json')
    //         });
    //         return next.handle(clonedreq).pipe(
    //             catchError(err => {
    //                 if (err instanceof HttpErrorResponse) {
    //                     switch ((<HttpErrorResponse>err).status) {
    //                         case 404:
    //                             this.handle404();
    //                         default:
    //                             return throwError(err);
    //                     }
    //                 } else {
    //                     return throwError(err);
    //                 }
    //             }),
    //             retryWhen(error => {
    //                 let retries = 1;
    //                 return error.pipe(
    //                     delay(1000),
    //                     map(error => {
    //                         if (retries++ === 2) {
    //                             throw error;
    //                         }
    //                         return error;
    //                     })
    //                 )
    //             }),
    //             catchError(err => {
    //                 console.log('error', err);
    //                 return EMPTY;
    //             }),
    //             finalize(() => {
    //                 this.loadingCtrl.getTop().then(hasLoading => {
    //                     if (hasLoading) {
    //                         this.loadingCtrl.dismiss();
    //                     }
    //                 });
    //             })
    //         );
    //     }
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedreq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.lclStr.getToken())
                .set('Content-Type', 'application/json')
        });
        return next.handle(clonedreq).pipe(
            tap(
                event => {
                    console.log('Connected Successfully AUTH', event);
                },
                err => {
                    console.log('Could not connect... AUTH', err);
                }
            )
        );
    }

    async showRetryToast(retryCount) {
        const toast = await this.toastCrtl.create({
            message: `Retry ${retryCount}/2`,
            id: 'retry',
            duration: 1000
        });
        toast.present();
    }

    async presentFailedAlert(msg) {
        const alert = await this.alertCtrl.create({
            message: msg,
            buttons: ['OK'],
            id: 'failed'
        });
        await alert.present();
    }

    handle404() {
        this.IonicComp.showToast('Please Check Your Credentials/User may not be registered')
    }
}