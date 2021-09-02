import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorage {
    email: string;
    constructor() { }

    sendEmail(email: string) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setFullUserData(data: any) {
        localStorage.setItem('fullUserData', JSON.stringify(data));
    }
    getFullUserData() {
        return JSON.parse(localStorage.getItem('fullUserData'));
    }
    deleteFullUserData() {
        localStorage.removeItem('fullUserData');
    }
    setDesignation(desg: string) {
        localStorage.setItem('designation', desg);
    }
    getDesignation() {
        return localStorage.getItem('designation');
    }
    deleteDesignation() {
        localStorage.removeItem('designation');
    }
    
    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    deleteToken() {
        localStorage.removeItem('token');
    }

    setOtpToken(token: string) {
        localStorage.setItem('otptoken', token);
    }
    getOtpToken() {
        return localStorage.getItem('otptoken');
    }
    deleteOtpToken() {
        localStorage.removeItem('otptoken');
    }

    setCarData(carData) {
        localStorage.setItem('carData', JSON.stringify(carData))
    }
    getCarData() {
        return JSON.parse(localStorage.getItem('carData'))
    }
    deleteCarData() {
        localStorage.removeItem('carData')
    }

    setDomainData(domainData) {
        localStorage.setItem('domainData', JSON.stringify(domainData))
    }
    getDomainData() {
        return JSON.parse(localStorage.getItem('domainData'))
    }
    deleteDomainData() {
        localStorage.removeItem('domainData')
    }
}
