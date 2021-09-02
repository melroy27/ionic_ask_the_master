import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NavController } from '@ionic/angular';
import { AnswerService } from '../../../core/services/answer.service';
import { IonicComponent } from '../../../core/components/ionic-component';
import { PostService } from '../../../core/services/posts.service';
import { LocalStorage } from '../../../core/storage/local-storage';
import { WriteAnswerComponent } from '../responsedue/write-answer/write-answer.component';
import { HelperfuncService } from '../../../core/services/helperfunc.service';
import { FileFunc } from '../../../core/services/filefunc.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  expand;
  userData;
  carExtra = new Map
  data;
  postId: string;
  answerList = [];
  headerTitle = "Answeres"
  hasAnsweredBefore = false
  indexOfAnswer: number
  answerToEdit: any
  constructor(
    private pstService: PostService,
    private ionComp: IonicComponent,
    public lclStr: LocalStorage,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private ansService: AnswerService,
    public helperFunc: HelperfuncService,
    public fileFunc: FileFunc
  ) { }

  ngOnInit() {
    this.userData = this.lclStr.getFullUserData();
    this.expand = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get("postId");
        this.pstService.getquestion(this.postId).subscribe(postData => {
          this.data = postData['data']
          this.carExtra.set(0, postData['data'].domain)
          this.carExtra.set(1, postData['data'].category)
          this.carExtra.set(2, postData['data'].subCategory)
        });
        this.ansService.getAnswerOnQuestion(this.postId).subscribe(res => {
          this.answerList = res['data']

          this.answerList.forEach((answer, index) => {
            if (answer.answeredBy.userId == this.userData.uid) {
              this.answerToEdit = answer
              this.hasAnsweredBefore = true
              this.indexOfAnswer = index
            }
          })
        });

      }
      else {
        this.navCtrl.navigateBack('/main/master/tabs/responsedue');
        return;
      }
    })
  }

  show() {
    if (this.expand == true) {
      this.expand = false;
    } else {
      this.expand = true;
    }
  }

  async edit() {
    const modal = await this.ionComp.ShowModal(WriteAnswerComponent, 'writeAnswer', {
      editMode: true,
      'CarExtra': this.carExtra,
      'PostData': this.data,
      'AnswerData': this.answerToEdit
    })
  }

  openDocument(file) {
    this.ionComp.loadingCtrl.create({
      animated: true,
      message: 'Opening Pdf...',
      showBackdrop: true,
      spinner: "dots"
    }).then(onFullfill => {
      onFullfill.present();
    })
    this.fileFunc.downloadSingleFile(file).then(res => {
      this.fileFunc.openFile(res.nativeURL)
    }).catch(err => {
      console.log(err)
    })
  }

  writeAnswer() {
    this.ionComp.ShowModal(WriteAnswerComponent, 'writeAnswer', {
      'CarExtra': this.carExtra,
      'PostData': this.data,
      editMode: false,
    })
  }
  closeModal() { }
}
