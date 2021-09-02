import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LocalStorage } from '../../core/storage/local-storage';
import { UserService } from '../../core/services/user.service';
import { CheckotpComponent } from '../checkotp/checkotp.component';
import { IonicComponent } from '../../core/components/ionic-component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgotComponent implements OnInit {
  passForm: FormGroup;
  isLoading = false;
  emailID: string;
  model = {
    email: ''
  }
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private userService: UserService,
    public toastController: ToastController,
    public lclStr: LocalStorage,
    public IonicComp: IonicComponent
  ) { }

  ngOnInit() {
    this.passForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.nullValidator
      ]],
    });
  }

  dismissmodal() {
    this.modalController.dismiss();
  }
  onSubmit() {
    this.userService.forgot(this.passForm.value).subscribe(
      res => {
        const resdata: any = res;
        this.IonicComp.showToast(res['message']);
        this.lclStr.sendEmail(this.passForm.value);
        this.emailID = this.passForm.value['email'];
        // this.checkOtp();
        this.IonicComp.ShowModal(CheckotpComponent, 'CheckotpComponentModal', { sendemail: this.emailID })
      },
      err => {
        console.log('Forgot', err)
        this.IonicComp.showToast(err.error.error['message']);
      }
    );
  }

  get email() {
    return this.passForm.get('email');
  }
  // async checkOtp() {
  //   const modal = await this.modalController.create({
  //     component: CheckotpComponent,
  //     id: "CheckotpModal",
  //     componentProps: {
  //       sendemail: this.emailID,
  //     }
  //   });
  //   return await modal.present();
  // }

}
