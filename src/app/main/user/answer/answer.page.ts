import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Post } from '../../../core/models/post.model';
import { PostService } from '../../../core/services/posts.service';
import { QuestionComponent } from '../home/question/question.component';
import { RatingComponent } from './rating/rating.component';
import { UserService } from '../../../core/services/user.service';
import { LocalStorage } from '../../../core/storage/local-storage';
import { IonicComponent } from '../../../core/components/ionic-component';
import { HelperfuncService } from 'src/app/core/services/helperfunc.service';
import { FileFunc } from '../../../core/services/filefunc.service';
import { AnswerService } from '../../../core/services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {
  headerTitle = "Answer"
  userData;
  data: Post
  expand;
  answeredOn: Date;
  colors = ['yellow', 'green', 'red'];

  popOverValue;
  private postId: string;
  carExtra: Map<number, string> = new Map
  answerList = [];

  ratedBefore;
  ratedIndex
  ratedValue = ""

  constructor(
    public toastController: ToastController,
    private navCtrl: NavController,
    public popCtrl: PopoverController,
    private route: ActivatedRoute,
    private pstService: PostService,
    public userSrvc: UserService,
    public lclStr: LocalStorage,
    private fileOpener: FileOpener,
    private ionComp: IonicComponent,
    public helperFunc: HelperfuncService,
    public fileFun: FileFunc,
    private ansService: AnswerService) { }

  // passing data from one page to another using paramMap
  ngOnInit() {
    this.userData = this.lclStr.getFullUserData();
    this.expand = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.postId = paramMap.get("postId");
        this.pstService.getquestion(this.postId).subscribe(postData => {
          console.log('Post Data=>', postData);
          this.data = postData['data']
          this.carExtra.set(0, postData['data'].domain).values.toString(),
            this.carExtra.set(1, postData['data'].category),
            this.carExtra.set(2, postData['data'].subCategory)
        });
        this.ansService.getAnswerOnQuestion(this.postId).subscribe(res => {
          this.answerList = res['data']
        })
      }
      else {
        this.navCtrl.navigateBack('/main/user/tabs/home');
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

  openDocument(file) {
    this.ionComp.loadingCtrl.create({
      animated: true,
      message: 'Opening Pdf...',
      showBackdrop: true,
      spinner: "dots"
    }).then(onFullfill => {
      onFullfill.present();
    })
    this.fileFun.downloadSingleFile(file).then(res => {
      this.fileOpener.showOpenWithDialog(res.nativeURL, 'application/pdf')
        .then(() => {
          console.log('File is opened')
          this.ionComp.loadingCtrl.dismiss()
        })
        .catch(e => {
          console.log('Error opening file', e)
          this.ionComp.loadingCtrl.dismiss()
        });
    }).catch(err => {
      console.log(err)
    })
  }

  async openRatingPopover(ev: any, type, data) {
    console.log('Data->', data)
    await this.checkIfRated(data.ratedBy, this.userData['uid'])
    console.log('Stats is -> ', this.ratedBefore)
    const popover = await this.popCtrl.create({
      component: RatingComponent,
      id: 'rating',
      componentProps: {
        questionId: this.data.id,
        answerId: data['_id'],
        userData: this.userData['uid'],
        ratedBefore: this.ratedBefore,
        ratedPosition: this.ratedIndex,
        ratingValue: this.ratedValue,
        typeOfRating: type
      },
      cssClass: 'pop-over-style'
    });

    popover.onDidDismiss().then(returnedValue => {
      if (returnedValue.data !== null) {
        this.popOverValue = returnedValue.data
        if (this.popOverValue === true) {
          this.toast();
        }
      }
    })
    return await popover.present();
  }

  checkIfRated = async (ratedBy, currentUser) => {
    if (ratedBy.length != 0) {
      ratedBy.forEach((element, index) => {
        if (element['userId'] == currentUser) {
          this.ratedIndex = index;
          this.ratedValue = element['ratingValue'];
          this.ratedBefore = true;
        } else {
          this.ratedBefore = false;
        }
      })
    }
    else {
      this.ratedBefore = false
    }
  }

  async edit() {
    const modal = await this.ionComp.ShowModal(QuestionComponent, 'QuestionModal', {
      editMode: true,
      answerData: this.data,
    })
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Please return to the Home Page to reflect rating.',
      duration: 3000
    });
    toast.present();
  }
  closeModal() {
    this.ionComp.modalController.dismiss();
  }
}


