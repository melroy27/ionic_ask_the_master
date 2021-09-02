
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ToastController, } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LocalStorage } from '../storage/local-storage';
@Injectable()
export class OtptokenInterceptor implements HttpInterceptor {
    constructor(
        public lclStr: LocalStorage
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedreq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.lclStr.getOtpToken())
                .set('Content-Type', 'application/json')
        });
        return next.handle(clonedreq).pipe(
            tap(
                event => {
                    console.log('Connected Successfully OTP TOKEN');
                },
                err => {
                    console.log('Could not connect successfully OTP TOKEN');
                }
            )
        );
    }
}