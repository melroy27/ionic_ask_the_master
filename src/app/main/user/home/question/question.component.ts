import {
  Component, OnInit, ViewEncapsulation,
  ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy, AfterViewInit
} from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';

import { QuestionComponentService } from '../../../../core/services/questionComponent.service'
import { Subscription } from 'rxjs/internal/Subscription';

import { UserService } from '../../../../core/services/user.service';
import { PostService } from '../../../../core/services/posts.service'
import { QuestionDataServiceService } from '../../../../core/services/question-data-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SpecialfunctionsService } from '../../../../core/services/specialfunctions.service';

import { LocalStorage } from '../../../../core/storage/local-storage';
import { IonicComponent } from '../../../../core/components/ionic-component';
import { FileFunc } from 'src/app/core/services/filefunc.service';
import { HelperfuncService } from 'src/app/core/services/helperfunc.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuestionComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private modalController: ModalController,
    public quesCom: QuestionComponentService,
    public QDS: QuestionDataServiceService,
    private fb: FormBuilder,
    public userService: UserService,
    public postService: PostService,
    public toastController: ToastController,
    public speclFun: SpecialfunctionsService,
    public lclStr: LocalStorage,
    public IonicComp: IonicComponent,
    public helperFunc: HelperfuncService,
    private navCtrl: NavController,
    public fileFun: FileFunc,
  ) { }

  mainQuestion: FormGroup;
  headerTitle = "Ask Question"
  DataFromText = "";
  FinalSelData;

  // coming from the question modal
  carData;
  domain;
  category;
  subcategory;

  // Variables for editing the data
  answerData;
  tempAnswerData;
  editMode: boolean;
  editStatus;
  btnText: string
  sections = []
  //  Variables for editing the data

  loadedComponents = [];

  componentSub: Subscription;
  indexSub: Subscription;

  userData;

  val = "";
  valViewable = true;

  index: number;

  colors = ['red', 'yellow', 'green'];

  @ViewChild('loadcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  ngOnInit() {
    this.editStatus = this.editMode;
    if (this.editStatus === true) {
      this.tempAnswerData = this.answerData;

      this.btnText = 'Update';
      console.log('Answer Data -> ', this.tempAnswerData)

      this.DataFromText = this.tempAnswerData.title

      let map = new Map
      map.set(0, this.tempAnswerData.domain)
        .set(1, this.tempAnswerData.category)
        .set(2, this.tempAnswerData.subCategory)
        .set(3, this.tempAnswerData.carData.carBrand)
        .set(4, this.tempAnswerData.carData.carModel)
        .set(5, this.tempAnswerData.carData.carType)
        .set(6, this.tempAnswerData.carData.carEngine)
        .set(7, this.tempAnswerData.carData.carTransmission)
        .set(8, this.tempAnswerData.carData.carYear)
      this.FinalSelData = map
      this.carData = this.tempAnswerData.carData
      this.sections = this.tempAnswerData.sections
    }
    else {
      this.btnText = "Submit";
    }
    this.mainQuestion = this.fb.group({
      quesTitle: [this.DataFromText, [
        Validators.required,
        Validators.minLength(2),
        Validators.nullValidator
      ]]
    });

    this.componentSub = this.quesCom.allcomponent.subscribe(components => { // behaviour subject
      this.loadedComponents = components;
    });

    this.indexSub = this.quesCom.allIndex.subscribe(indexCount => {// behaviour subject for viewContainer Ref
      this.index = indexCount;
    });
    console.log(this.index)

    this.userData = this.lclStr.getFullUserData();
  }

  ngAfterViewInit() {

    if (this.editStatus == true) {

      this.QDS.setEditMode(true)

      this.sections.forEach((value, index) => {

        if (value['Type'] == 'text') {
          this.helperFunc.openContainer('textcontainer', this.entry, value['Text'])
        } else if (value['Type'] == 'document') {
          this.helperFunc.openContainer('documentcontainer', this.entry, value['file']['url'])
        } else if (value['Type'] == 'image') {
          this.helperFunc.openContainer('cameracontainer', this.entry, value['file']['url'])
        }
      });
    }
  }

  openDynaComponents = (type: string) => {
    this.helperFunc.openContainer(type, this.entry)
  }

  // search bar
  onSearchChange(e) {
    this.val = e.detail.value;
    this.postService.searchQuestionHome(this.val);
  }

  async onSubmit() {
    const textTitle: string = this.mainQuestion.value['quesTitle'];

    let finalData = [];

    finalData = await this.helperFunc.settingSections(this.loadedComponents)

    console.log('Final Data -> ', finalData)
    console.log('SubCategory', this.subcategory)

    var askedBy = {
      "userId": this.userData['uid'],
      "name": this.userData['name']
    }

    if (this.editStatus == true) {

      let id = this.tempAnswerData['id']

      console.log(this.carData)

      this.postService.updateQuestion(id, this.carData, this.tempAnswerData.domain, this.tempAnswerData.category, this.tempAnswerData.subCategory, askedBy, finalData, textTitle).subscribe(res => {
        if (res['success'] === true) {
          this.IonicComp.showToast("Question Updated Successfully");
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.reseting();
          this.modalController.dismiss(null, null, "QuestionModal")
          this.navCtrl.navigateBack('/main/user/tabs/home');
        } else {
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.IonicComp.showToast("Couldn't Update Question");
        }
      })
    }
    else {
      this.postService.addQuestion(this.carData, this.domain, this.category, this.subcategory, askedBy, finalData, textTitle).subscribe(res => {
        if (res['success'] === true) {
          this.IonicComp.showToast("Post Created Successfully");
          this.reseting()
          this.IonicComp.modalController.dismiss(null, null, "DomainController")
          this.IonicComp.modalController.dismiss(null, null, "categorymodal");
          this.IonicComp.modalController.dismiss(null, null, "subcategorymodal");
          this.IonicComp.modalController.dismiss(null, null, "carmodal");
          this.IonicComp.modalController.dismiss(null, null, "questionmodal")
          // this.helperFunc.controllerDismiss();
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
        } else {
          this.IonicComp.showToast("Couldn't Create Question Please Try Again Later");
          this.reseting()
          this.IonicComp.modalController.dismiss(null, null, "DomainController")
          this.IonicComp.modalController.dismiss(null, null, "categorymodal");
          this.IonicComp.modalController.dismiss(null, null, "subcategorymodal");
          this.IonicComp.modalController.dismiss(null, null, "carmodal");
          this.IonicComp.modalController.dismiss(null, null, "questionmodal")
          // this.helperFunc.controllerDismiss();
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
        }
        this.speclFun.getDataFromApi();
      })
    }
  }

  closeModal() {
    this.IonicComp.modalController.dismiss();
    this.reseting();
  }

  reseting() {
    this.QDS.setGlobalCounter(0);
    this.loadedComponents = [];
  }

  ngOnDestroy() {
    if (this.componentSub && this.indexSub) {
      this.componentSub.unsubscribe();
      this.indexSub.unsubscribe();
    }
  }

}
