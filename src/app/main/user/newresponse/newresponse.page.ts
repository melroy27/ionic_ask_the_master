import { Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { SpecialfunctionsService } from '../../../core/services/specialfunctions.service';
import { PostService } from '../../../core/services/posts.service';
import { IonicComponent } from '../../../core/components/ionic-component';
@Component({
  selector: 'app-newresponse',
  templateUrl: './newresponse.page.html',
  styleUrls: ['./newresponse.page.scss'],
})
export class NewresponsePage implements OnInit, OnDestroy {
  headerTitle = "New Response"
  answeredData = [];
  colors = ['red', 'yellow', 'green'];
  answerCount
  constructor(public postSrvc: PostService,
    public speclFun: SpecialfunctionsService, public ionComp: IonicComponent) { }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log('Entered...')
    this.showAllData();
  }
  showAllData() {
    this.speclFun.getAnsweredQuestionDataFromApi()
  }
  closeModal() {
    this.ionComp.modalController.dismiss();

  }
  ngOnDestroy() { }
}
