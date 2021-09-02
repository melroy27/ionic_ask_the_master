import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from '../../../core/services/posts.service';
import { SpecialfunctionsService } from '../../../core/services/specialfunctions.service'
import { DomainComponent } from './domain/domain.component';
import { FilterComponent } from './filter/filter.component';
import { QuestionDataServiceService } from '../../../core/services/question-data-service.service'
import { IonicComponent } from 'src/app/core/components/ionic-component';
import { LocalStorage } from '../../../core/storage/local-storage';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  tknResp: string;
  colors = ['red', 'yellow', 'green'];
  popOverValue: any;

  constructor(
    public postsService: PostService,
    public popCtrl: PopoverController,
    public modalController: ModalController,
    public alertController: AlertController,
    public loadingCtl: LoadingController,
    public router: Router,
    public speclFun: SpecialfunctionsService,
    public qds: QuestionDataServiceService,
    public IonicComp: IonicComponent,
    public lclStr: LocalStorage,
    private userService: UserService,

  ) {
  }

  ionViewWillEnter() {
    this.showAllData();
  }

  ngOnInit() {
    this.fetchCarData();
    this.fetchDomainData();
  }

  async popoverfilter(ev: any) {
    const popover = await this.popCtrl.create({
      component: FilterComponent,
      id: 'filter',
      componentProps: {
        previouslySelectedValue: this.popOverValue
      },
      cssClass: 'pop-over-style'
    });
    popover.onDidDismiss().then(returnedValue => {
      if (returnedValue.data !== undefined) {
        this.popOverValue = returnedValue.data['value']
        console.log('pop val->', this.popOverValue)
      }
    })
    return await popover.present();
  }

  async showAllData() {
    this.speclFun.getDataFromApi();
    // await this.loadingCtl.dismiss(null, null, 'interceptor')
  }

  // show modal
  async askQuestion() {
    this.IonicComp.ShowModal(DomainComponent, 'DomainController')

  }

  // search bar
  onSearchChange(e) {
    let val = e.detail.value;
    if (val == '' && this.popOverValue == undefined) {
      this.speclFun.getDataFromApi();
    } else {
      this.postsService.searchQuestionHome(val, this.popOverValue);
    }
  }

  pressRefresh() {
    this.speclFun.getDataFromApi();
  }

  fetchCarData = () => {
    this.postsService.getCarData().subscribe(res => {
      this.lclStr.setCarData(res['data'])
    })
  }

  fetchDomainData = () => {
    this.postsService.getDomain().subscribe(res => {
      this.lclStr.setDomainData(res['data'])
    })
  }
}