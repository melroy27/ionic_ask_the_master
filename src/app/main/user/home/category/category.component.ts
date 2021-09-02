import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicComponent } from '../../../../core/components/ionic-component';
import { CarComponent } from '../car/car.component';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CategoryComponent implements OnInit {

  constructor(private modalController: ModalController, public IonicComp: IonicComponent) { }
  domain;
  completeData;
  selectedData;
  passedData;
  headerTitle = "Choose Category"
  ngOnInit() { }

  closeModal() {
    this.IonicComp.modalController.dismiss();
  }

  checkSubOrCar(data: string, index: number) {
    if (this.completeData['subCheck'] == false) {
      this.openCarModal(data, index);
    } else {
      this.openSubCategoryModal(data, index);
    }
  }

  async openCarModal(catname, index) {
    const modal = await this.IonicComp.ShowModal(CarComponent, 'carmodal', {
      categoryname: catname, domain: this.domain,
    })
  }
  async openSubCategoryModal(catname, index) {
    this.passedData = this.completeData
    const modal = await this.IonicComp.ShowModal(SubcategoryComponent, 'subcategorymodal', {
      fullData: this.passedData,
      domain: this.domain,
      categoryname: catname
    })
  }
}
