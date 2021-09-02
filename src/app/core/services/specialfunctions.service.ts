import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IonicComponent } from '../components/ionic-component';
import { PostService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialfunctionsService {
  private questionSub: Subscription;
  constructor(public postsService: PostService, public alertController: AlertController, public router: Router,
    private fileOpener: FileOpener,
    public ionicComp: IonicComponent) { }

  postCount;
  initial = true;
  questions = [];

  getDataFromApi = () => {
    let count = 0;
    this.postsService.getPosts();

    this.questionSub = this.postsService.getPostUpdateListener()
      .subscribe((data) => {
        this.questions = data;
      });
    this.postsService.myData.subscribe(res => {
      if (this.initial == true) {
        count++;
        this.postCount = res;
        this.initial = false;
      } else {
        if (res <= this.postCount) {
        } else if (res > this.postCount) {
          count++;
          this.postCount = res;
          if (count > 2) {
            this.presentAlert("New Question");
          }
        }
      }
    });
  }

  getQuestionDataFromApi = () => {
    this.postsService.getPosts();
    this.questionSub = this.postsService.getPostUpdateListener().subscribe((data) => {
      let temp = []
      data.forEach(element => {
        if (!element.totalAnswers) {
          temp.push(element);
        }
      })
      this.questions = temp
    });
  }

  getNonAnsweredQuestion = () => {
    this.postsService.getPosts();
    this.questionSub = this.postsService.getPostUpdateListener().subscribe((data) => {
      let temp = []
      data.forEach(element => {
        if (element.totalAnswers == 0) {
          temp.push(element)
        }
      })
      this.questions = temp
    });
  }


  getAnsweredQuestionDataFromApi = () => {
    this.postsService.getPosts();
    this.questionSub = this.postsService.getPostUpdateListener().subscribe((data) => {
      let temp = []
      data.forEach(element => {
        if (element.totalAnswers >= 1) {
          temp.push(element);
        }
      })
      this.questions = temp
    });
  }


  // display an alert for new post
  presentAlert = async (message) => {
    const alert = await this.alertController.create({
      header: 'What would you like to do?',
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        }, {
          text: 'Visit',
          handler: () => {
            this.router.navigateByUrl('main/user/tabs/home');
          }
        }
      ]
    });

    await alert.present();
  }

}