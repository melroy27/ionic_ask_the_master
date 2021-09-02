import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicComponent } from '../../../../core/components/ionic-component';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
})
export class SubcategoryComponent implements OnInit {

  constructor(private modalController: ModalController, public IonicComp: IonicComponent) { }
  headerTitle = "Choose subcategory"
  subcat;
  fullData

  domain;

  categoryname;
  categoryindex;

  ngOnInit() {
    this.getasingle()
  }

  closeModal() {
    this.IonicComp.modalController.dismiss();
  }

  getasingle() {
    this.fullData.category.forEach(element => {
      let catname: string = element.catname;
      if (catname == this.categoryname) {
        this.subcat = element.subcategory
      }
    });
  }
  async openCarModal(subcat: string) {
    const modal = await this.IonicComp.ShowModal(CarComponent, 'carmodal', {
      "domain": this.domain,
      "categoryname": this.categoryname,
      "subcategory": subcat
    })
  }
}
