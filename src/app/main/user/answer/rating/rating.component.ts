import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PostService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  colors = ['red', 'yellow', 'green'];

  // rating;
  userData;
  ratedBefore;
  ratedPosition;
  ratingValue;
  questionId;
  typeOfRating
  answerId;
  ratingChange = false;
  optionSelected;
  string = ['Not Resolved', 'Partially Resolved', 'Resolved'];

  constructor(public popCtrl: PopoverController, public postService: PostService) { }

  ngOnInit() {

    console.log("Type of Rating :", this.typeOfRating);

    console.log('UserData: ', this.userData);
    console.log("Rated Before:", this.ratedBefore);
    console.log("OldRating Value:", this.ratingValue);

    console.log("Rated Position:", this.ratedPosition);

    console.log("QuestionId: ", this.questionId)
    console.log("AnswerId: ", this.answerId)
  }

  async submitRating(val) {
    console.log('Selected Value is -> ', val);
    if (val === "Not Resolved") {
      this.optionSelected = 'unResolved';

      if (!this.ratedBefore) {
        if (this.typeOfRating == 'question') {
          await this.ratedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, "")
        } else if (this.typeOfRating == 'answer') {
          await this.ratedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, "")
        }
      } else {
        if (this.typeOfRating == 'question') {
          await this.notRatedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        } else if (this.typeOfRating == 'answer') {
          await this.notRatedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        }
      }

      this.ratingChange = true;

    } else if (val === "Partially Resolved") {
      this.optionSelected = 'partial';

      if (!this.ratedBefore) {
        if (this.typeOfRating == 'question') {
          await this.ratedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, "")
        } else if (this.typeOfRating == 'answer') {
          await this.ratedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, "")
        }
      } else {
        if (this.typeOfRating == 'question') {
          await this.notRatedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        } else if (this.typeOfRating == 'answer') {
          await this.notRatedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        }
      }

      this.ratingChange = true;

    } else if (val === "Resolved") {
      this.optionSelected = 'resolved';

      if (!this.ratedBefore) {
        if (this.typeOfRating == 'question') {
          await this.ratedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, "")
        } else if (this.typeOfRating == 'answer') {
          await this.ratedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, "")
        }
      } else {
        if (this.typeOfRating == 'question') {
          await this.notRatedForFirstTimeQuestion(this.questionId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        } else if (this.typeOfRating == 'answer') {
          await this.notRatedForFirstTimeAnswer(this.questionId, this.answerId, this.optionSelected, this.userData, this.ratingValue, this.ratedPosition)
        }
      }

      this.ratingChange = true;

    }
    this.popCtrl.dismiss(this.ratingChange, null, 'rating');
  }

  ratedForFirstTimeQuestion = async (qid, newValue, userId, oldValue) => {
    return this.postService.changeRatingQuestion(qid, newValue, userId, oldValue).subscribe(res => {
      console.log(res)
    })
  }

  notRatedForFirstTimeQuestion = async (qid, newValue, userId, oldValue, position) => {
    return this.postService.changeRatingQuestion(qid, newValue, userId, oldValue, position).subscribe(res => {
      console.log(res)
    })
  }

  ratedForFirstTimeAnswer = async (qid, aid, newValue, userId, oldValue) => {
    console.log('Entered Here..')
    return this.postService.changeRatingAnswer(qid, aid, newValue, userId, oldValue).subscribe(res => {
      console.log(res)
    })
  }

  notRatedForFirstTimeAnswer = async (qid, aid, newValue, userId, oldValue, position) => {
    return this.postService.changeRatingAnswer(qid, aid, newValue, userId, oldValue, position).subscribe(res => {
      console.log(res)
    })
  }
}
