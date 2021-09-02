import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorage } from '../../../../core/storage/local-storage';
import { IonicComponent } from '../../../../core/components/ionic-component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class DomainComponent implements OnInit {
  localStrCarData: any;
  headerTitle = "Select Domain"
  Domain = []
  constructor(public IonicComp: IonicComponent, public lclStr: LocalStorage) { }


  async getCompleteDomain(val: string) {
    this.Domain.forEach(async (element) => {
      if (element.name === val) {
        var temp = element;
        const modal = await this.IonicComp.ShowModal(CategoryComponent, 'categorymodal', {
          domain: val,
          completeData: temp,
          selectedData: {
            "domain": val
          }
        })
      }
    });
  }

  ngOnInit() {
    this.localStrCarData = this.lclStr.getDomainData()
    this.localStrCarData.forEach(element => {
      this.Domain.push(element);
    })
  }

  closeModal() {
    this.IonicComp.modalController.dismiss();
  }

  value(value: any) {
    console.log(value);
  }

}
