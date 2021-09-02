import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '../../../core/storage/local-storage';
import { IonicComponent } from '../../../core/components/ionic-component';
import { SpecialfunctionsService } from '../../../core/services/specialfunctions.service';
import { WriteAnswerComponent } from './write-answer/write-answer.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../../../core/services/posts.service';
@Component({
  selector: 'app-responsedue',
  templateUrl: './responsedue.page.html',
  styleUrls: ['./responsedue.page.scss'],
})
export class ResponseduePage implements OnInit {
  colors = ['red', 'yellow', 'green'];
  headerTitle = "response due"
  carExtra = new Map
  data;
  postId: string;

  constructor(public speclFun: SpecialfunctionsService, private IonComp: IonicComponent,
    public lclStr: LocalStorage,
    private route: ActivatedRoute,
    private pstService: PostService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.showQuestions();
    }, 300000);
  }

  ionViewWillEnter() {
    console.log('Entered...')
    this.showQuestions();
  }

  showQuestions() {
    this.speclFun.getNonAnsweredQuestion();
  }

  async writeAnswer(itemId) {
    await this.beforeWritingAnswer(itemId)
  }


  beforeWritingAnswer = async (itemid) => {
    this.pstService.getquestion(itemid).subscribe(postData => {
      if (postData != "") {
        this.data = postData['data']
        this.carExtra.set(0, postData['data'].domain)
        this.carExtra.set(1, postData['data'].category)
        this.carExtra.set(2, postData['data'].subCategory)
        this.openAnswerModel();
      } else {
        console.log('Something is wrong')
      }
    })
  }

  openAnswerModel = () => {
    this.IonComp.ShowModal(WriteAnswerComponent, 'writeAnswer', {
      'editMode': false,
      'CarExtra': this.carExtra,
      'PostData': this.data,
    });
  }
}
