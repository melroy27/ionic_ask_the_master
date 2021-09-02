import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '../storage/local-storage';
import { AuthEndPoints } from '../const_endPoint'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = {
    headers: new HttpHeaders({
      NoAuth: 'True'
    })
  };

  constructor(private http: HttpClient, public lclStr: LocalStorage) { }
  // main API Methods...

  login = (authCredentials) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.AUTH, authCredentials);
  }
  validateToken = (token) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.AUTH_VAL_TOKEN, token);
  }
  forgot = (email) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.AUTH_FORGOT, email);
  }
  checkOtp = (otpcreds) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.AUTH_FORGOT_CHECK, otpcreds);
  }
  resetPass = (key) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.AUTH_FORGOT_RESET, key);
  }


  getUserPayLoad = () => {
    const token = this.lclStr.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }

  isLoggedIn = () => {
    const userPayload = this.getUserPayLoad();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else {
      return false;
    }
  }

}
