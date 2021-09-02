import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from '../core/services/user.service'
import { ForgotComponent } from './forgot/forgot.component';
import { IonicComponent } from '../core/components/ionic-component';
import { LocalStorage } from '../core/storage/local-storage';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public modalController: ModalController,
    private userService: UserService,
    public IonicComp: IonicComponent,
    public lclStr: LocalStorage
  ) { }
  tknResp: string;
  model = {
    email: '',
    key: ''
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';

  resData;
  resUserData;
  fullUserData;

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.nullValidator
      ]],
      key: ['', [
        Validators.required,
        Validators.nullValidator
      ]],
    });

    if (this.userService.isLoggedIn()) {
      const stats = this.lclStr.getDesignation();
      if (stats === 'employee') {
        this.router.navigateByUrl('/main/user');
      } else {
        this.router.navigateByUrl('/main/master');
      }
    }
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        this.resData = res;
        console.log(this.resData);
        this.fullUserData = this.resData.data['user'];
        this.resUserData = this.resData.data.user.designation;
        const resToken = this.resData.data.token['token'];

        this.lclStr.setToken(resToken);

        // Validating the TOKEN
        this.validateToken();
        // reset form
        this.resetForm();
        if (this.resUserData == 'employee') {
          this.lclStr.setDesignation(this.resUserData);
          this.lclStr.setFullUserData(this.fullUserData);
          this.router.navigateByUrl('/main/user');
        }
        else {
          this.lclStr.setFullUserData(this.fullUserData);
          this.lclStr.setDesignation(this.resUserData);
          this.router.navigateByUrl('/main/master');
        }
      },
      err => {
        this.IonicComp.showToast('Please Check Email Id and Password');
        this.IonicComp.loadingCtrl.dismiss();
        console.log(err);
      }
    );
  }

  // opening the forgot password Modal
  forgotPswd() {
    this.resetForm();
    this.IonicComp.ShowModal(ForgotComponent, 'ForgotComponentModal');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('key');
  }

  validateToken() {
    const token = this.lclStr.getToken();
    this.userService.validateToken({ 'token': token }).subscribe(
      res => {
        console.log('Validating Token', res)
        let resData: any = res['success'];
        this.tknResp = resData;
        console.log("Sucess Message: ", this.tknResp);
        if (this.tknResp === 'false') {
          this.router.navigateByUrl('/auth');
          this.IonicComp.showToast('Please Try Again')
        }
      },
      err => {
        console.log('Some Bad Error', err);
        this.router.navigateByUrl('/auth');

      }
    );
  }
  resetForm() {
    this.loginForm.reset();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }
}
