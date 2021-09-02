import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class IonicComponent {
    constructor(
        public loadingCtrl: LoadingController,
        public toastCrtl: ToastController,
        public alertCtrl: AlertController,
        public modalController: ModalController
    ) { }

    // present toasts 
    async showToast(msg) {
        const toast = await this.toastCrtl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }
    async showSpinner(options) {
        await (await this.loadingCtrl.create(options)).present();
    }
    async ShowModal(componentName, compId?: string, compProps?: any) {
        const modal = await this.modalController.create({
            component: componentName,
            id: compId,
            componentProps: compProps
        });
        return await modal.present();
    }

    async closeModal() {
        await this.modalController.dismiss();
    }
}
