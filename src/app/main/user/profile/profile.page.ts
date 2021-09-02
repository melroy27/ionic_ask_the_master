import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, PickerController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { LocalStorage } from '../../../core/storage/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fullUserData;
  dealerName = '';
  constructor(
    public pickerController: PickerController,
    public userSrvc: UserService,
    private loadingCtrl: LoadingController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public lclStr: LocalStorage
  ) { }

  ngOnInit() {
    this.fullUserData = this.lclStr.getFullUserData();
  }

  async openDealer() {
    const picker = await this.pickerController.create(
      {
        columns: [
          {
            name: 'dealer',
            options: [
              {
                text: 'Melbourne City JLR-02121/02124-Port Melbourne- VIC', value: 'AUDI KLERKSDORP - AUDI-KLERLSDORP-REGION 4'
              },
              {
                text: 'Vue', value: 'B'
              }
            ]
          }],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },

          {
            text: 'Confirm',
            handler: (value) => {
              this.dealerName = value.dealer.value;
            }
          }
        ]
      }
    ).then((data) => {
      data.present();
    });
  }
  async camera() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select source',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('Camera clicked');
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          console.log('Gallery clicked');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  logout() {
    if (this.fullUserData.designation == 'employee') {
      this.lclStr.deleteDesignation();
      this.lclStr.deleteFullUserData();
      this.lclStr.deleteToken();
      this.lclStr.deleteCarData();
      this.lclStr.deleteDomainData();
      this.showSpinner();
      this.router.navigateByUrl('/auth');
    }
    this.lclStr.deleteDesignation();
    this.lclStr.deleteFullUserData();
    this.lclStr.deleteToken();
    this.showSpinner();
    this.router.navigateByUrl('/auth');
  }
  
  showSpinner() {
    this.loadingCtrl.getTop().then(hasLoading => {
      if (!hasLoading) {
        this.loadingCtrl.create({
          spinner: 'circular',
          translucent: true,
          duration: 5000
        }).then(loading => loading.present());
      }
    });
  }
}
