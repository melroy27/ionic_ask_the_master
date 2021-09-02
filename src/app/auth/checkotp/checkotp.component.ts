import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { IonicComponent } from '../../core/components/ionic-component';
import { UserService } from '../../core/services/user.service';
import { LocalStorage } from '../../core/storage/local-storage';
import { ResetComponent } from '../reset/reset.component';

@Component({
  selector: 'app-checkotp',
  templateUrl: './checkotp.component.html',
  styleUrls: ['./checkotp.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CheckotpComponent implements OnInit {
  emailID: string;
  EId: string;
  model = {
    email: '',
    otp: ''
  }
  otpForm: FormGroup;
  sendemail: any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public lclStr: LocalStorage,
    public IonicComp: IonicComponent
  ) { }

  ngOnInit() {
    this.emailID = this.sendemail
    this.otpForm = this.fb.group({
      email: new FormControl({ value: this.sendemail, disabled: 'true' }),
      otp: ['', [
        Validators.required,
        Validators.nullValidator,
        Validators.pattern('[0-9]{4}')
      ]]
    });
  }
  reSubmit() {
    this.userService.forgot({ 'email': this.sendemail }).subscribe(
      res => {
        this.IonicComp.showToast(res['message']);
      },
      err => {
        this.IonicComp.showToast(err.error['message']);
      }
    );
  }
  submitOtp() {
    this.userService.checkOtp({ "email": this.sendemail, "otp": this.otpForm.value['otp'] }).subscribe(
      res => {
        const resData: any = res;
        const resToken = resData.data.token
        this.lclStr.setOtpToken(resToken);
        this.IonicComp.ShowModal(ResetComponent, 'ResetComponentModal');
      },
      err => {
        this.IonicComp.showToast(err.error['message']);
      }
    );
  }

  get email() {
    return this.otpForm.get('email');
  }
  get otp() {
    return this.otpForm.get('otp');
  }

}
