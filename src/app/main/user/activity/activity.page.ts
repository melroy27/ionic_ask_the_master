import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SpecialfunctionsService } from '../../../core/services/specialfunctions.service';
import { PostService } from '../../../core/services/posts.service'
import { AnswerService } from '../../../core/services/answer.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit, OnDestroy {
  headerTitle="Activity"
  postCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  answerCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(public speclFun: SpecialfunctionsService, public postServ: PostService, public ansService: AnswerService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    let tempAnswer = []
    let tempdata = [];

    tempdata = this.postServ.posts;
    if (tempdata.length != 0) {
      tempdata.forEach(value => {
        let val = value.askedOn.toString().substr(0, 10);
        let dd = val.substr(8)
        let month = val.substr(5, 2);
        if (dd == "01" && month == "01") {
          this.postCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.getMonths(month, this.postCount);
          this.loadQuestionAskedGraph();
        }
        this.getMonths(month, this.postCount);
        this.loadQuestionAskedGraph();
      })
    }

    this.ansService.getAnswerList().subscribe(res => {
      tempAnswer = res['data']
      tempAnswer.forEach(value => {
        if (tempAnswer.length != 0) {
          let val = value.creationTime.toString().substr(0, 10);
          let dd = val.substr(8)
          let month = val.substr(5, 2);
          if (dd == "01" && month == "01") {
            this.answerCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.getMonths(month, this.answerCount);
            this.loadQuestionAskedGraph();
          }
          this.getMonths(month, this.answerCount);
          this.loadQuestionAskedGraph();
        }
      })
    })
  }

  onFilterUpdate(event: CustomEvent) {
    if (event.detail.value === 'asked') {
      this.loadQuestionAskedGraph();
    }
    else {
      this.loadQuestionAnsweredGraph();
    }
  }

  loadQuestionAskedGraph() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    canvas.style.height = '128px';
    const ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'Questions Asked',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.postCount
        }]
      },

      // Configuration options go here
      options: {}
    });
  }
  loadQuestionAnsweredGraph() {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    var myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'Questions Answered',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.answerCount
        }]
      },

      // Configuration options go here
      options: {}
    });
  }
  getMonths(month_as_input, array?) {
    switch (month_as_input) {
      case '01':
        array[0] = array[0] + 1;
        break;
      case '02':
        array[1] = array[1] + 1;
        break;
      case '03':
        array[2] = array[2] + 1;
        break;
      case '04':
        array[3] = array[3] + 1;
        break;
      case '05':
        array[4] = array[4] + 1;
        break;
      case '05':
        array[5] = array[5] + 1;
        break;
      case '06':
        array[6] = array[6] + 1;
        break;
      case '07':
        array[7] = array[7] + 1;
        break;
      case '08':
        array[8] = array[8] + 1;
        break;
      case '09':
        array[9] = array[9] + 1;
        break;
      case '10':
        array[10] = array[10] + 1;
        break;
      case '11':
        array[11] = array[11] + 1;
        break;
    }
  }

  ngOnDestroy() { }
}
