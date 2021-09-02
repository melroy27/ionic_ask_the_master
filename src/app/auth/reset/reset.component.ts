import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { LocalStorage } from '../../core/storage/local-storage';
import { UserService } from '../../core/services/user.service';
import { IonicComponent } from '../../core/components/ionic-component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResetComponent implements OnInit {
  tknResp: string;

  passReset: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    public lclStr: LocalStorage,
    public IonicComp: IonicComponent
  ) { }

  ngOnInit() {
    this.passReset = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  submitPswd() {
    let pass: string = this.passReset.value['password'];
    this.userService.resetPass({ "key": pass }).subscribe(
      res => {
        console.log('Res->', res)
        this.IonicComp.showToast(res['message']);
        this.lclStr.deleteOtpToken();
        this.loadingCtrl.dismiss();
        this.controllersDismiss();
      },
      err => {
        console.log('Error ->', err)
        // this.IonicComp.showToast(err.error.error.message);
        this.IonicComp.loadingCtrl.dismiss();
      }
    );
  }

  controllersDismiss() {
    this.IonicComp.modalController.dismiss(null, null, 'ForgotComponentModal');
    this.IonicComp.modalController.dismiss(null, null, 'CheckotpComponentModal');
    this.IonicComp.modalController.dismiss(null, null, 'ResetComponentModal');
  }
}
