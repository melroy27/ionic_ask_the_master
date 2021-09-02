
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { LocalStorage } from '../storage/local-storage';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    constructor(
        public lclStr: LocalStorage
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.match('/auth')) {
            return next.handle(req)
        } else {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.lclStr.getToken())
                    .set('Content-Type', 'application/json')
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => {
                        console.log('Connected Successfully GLOBAL', event);
                    },
                    err => {
                        console.log('Could not connect... GLOBAL', err);
                    }
                )
            );
        }
    }
}