import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/posts.service';
import { IonicComponent } from '../../../core/components/ionic-component';
import { SpecialfunctionsService } from '../../../core/services/specialfunctions.service';
import { FilterComponent } from '../../user/home/filter/filter.component';
import { WriteAnswerComponent } from '../responsedue/write-answer/write-answer.component';
@Component({
  selector: 'app-searchquestion',
  templateUrl: './searchquestion.page.html',
  styleUrls: ['./searchquestion.page.scss'],
})
export class SearchquestionPage implements OnInit, OnDestroy {
  colors = ['yellow', 'green', 'red'];
  popOverValue: any;
  constructor(public speclFun: SpecialfunctionsService, private IonComp: IonicComponent,
    public postsService: PostService,
    public popCtrl: PopoverController) { }
  headerTitle = "search question"
  ngOnInit() { }

  ionViewWillEnter() {
    this.showQuestions()
  }

  showQuestions() {
    this.speclFun.getQuestionDataFromApi();
  }
  onSearchChange(e) {
    let val = e.detail.value;
    this.postsService.searchQuestionHome(val, this.popOverValue);
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
      }
    })
    return await popover.present();
  }
  writeAnswer() {
    this.IonComp.ShowModal(WriteAnswerComponent, 'writeAnswer', {
      'editMode': false
    });
  }

  ngOnDestroy() { }

}
