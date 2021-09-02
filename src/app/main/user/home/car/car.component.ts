import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LocalStorage } from '../../../../core/storage/local-storage';
import { IonicComponent } from '../../../../core/components/ionic-component';

import { QuestionComponent } from '../question/question.component';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class CarComponent implements OnInit {
  constructor(
    public alertController: AlertController,
    public IonicComp: IonicComponent,
    public lclStr: LocalStorage,
  ) { }

  carmodel = [];
  selectedData;

  domain;
  categoryname;
  subcategory;

  bodyType;
  engineType;
  transmissionType;
  yearModel;

  completeData_model;
  completeData_body;
  completeData_engine;
  completeData_trans;
  completeData_year;

  modelval;
  bodyval;
  engineval;
  transval;
  yearval;

  localStrCarData = []

  checkSelection = true;
  headerTitle = "Select Car"
  sliderConfig = {
    spaceBetween: 5,
    slidesPerView: 2.75
  }

  ngOnInit() {

    this.localStrCarData = this.lclStr.getCarData()
    this.localStrCarData.forEach(element => {
      this.carmodel.push(element['model']);
    })
  }

  showBodyType(modelname, index) {
    this.localStrCarData.forEach((element) => {

      let carmodelname = element['model']['mname'];

      if (carmodelname === modelname) {
        this.modelval = index;
        this.completeData_model = modelname;
        this.bodyType = this.carmodel[index]['bodytype'];
      }
    });
  }

  showEngineType(btype) {
    this.bodyType.forEach((element, index) => {
      let bdyType = element['name'];
      if (bdyType === btype) {
        this.bodyval = index;
        this.completeData_body = btype;
        this.engineType = element['engine'];
      }
    });
  }

  showTranmissionType(enginetype) {
    this.engineType.forEach((element, index) => {

      let engType = element['enginetype']
      if (engType === enginetype) {
        this.engineval = index;
        this.completeData_engine = enginetype
        this.transmissionType = element['transmission']
      }
    });
  }
  showYear(transType) {
    this.transmissionType.forEach((element, index) => {

      let transmission = element['transtype'];
      if (transmission === transType) {
        this.transval = index;
        this.completeData_trans = transType;
        this.yearModel = element['year'];
      }
    });
  }
  getyear(year) {
    this.yearModel.forEach((element, index) => {
      let dataYear = element['yearmodel'];
      if (dataYear === year) {
        this.yearval = index;
      }
    });
    this.completeData_year = year;
    console.log(this.modelval, this.bodyval, this.engineval, this.transval, this.yearval)
    this.checkIfAllAreSelected();
  };

  checkIfAllAreSelected() {
    if (this.yearval != null) {
      this.checkSelection = false;
    }
  }

  async questionModal() {
    if (this.checkSelection == false) {
      const modal = await this.IonicComp.ShowModal(QuestionComponent, 'questionmodal', {
        FinalSelData: {
          '1': this.domain,
          '2': this.categoryname,
          '3': this.subcategory,
          '4': this.localStrCarData[0]['brandName'],
          '5': this.completeData_model,
          '6': this.completeData_body,
          '7': this.completeData_engine,
          '8': this.completeData_trans,
          '9': this.completeData_year,
        },
        carData: {
          "carBrand": this.localStrCarData[0]['brandName'],
          "carModel": this.completeData_model,
          "carType": this.completeData_body,
          "carEngine": this.completeData_engine,
          "carTransmission": this.completeData_trans,
          "carYear": this.completeData_year
        },
        domain: this.domain,
        category: this.categoryname,
        subcategory: this.subcategory,
        editMode: false
      })
    }
  }
  closeModal() {
    this.IonicComp.closeModal();
  }
}
