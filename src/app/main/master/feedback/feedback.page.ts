import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { LocalStorage } from '../../../core/storage/local-storage';
import { AnswerService } from '../../../core/services/answer.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  constructor(public ansService: AnswerService, public lclStr: LocalStorage) { }
  info = []
  headerTitle="Feedback"
  chartName = []
  dataArr = []

  map = new Map

  ngOnInit() { }

  ionViewWillEnter() {
    let dataForDo
    let masterData = this.lclStr.getFullUserData()
    let usr_id = masterData.uid

    this.ansService.getMasterRating(usr_id).subscribe(res => {
      this.info = res['data']

      this.info.forEach((element, index) => {
        let mainArr = [];

        dataForDo = [element['rating']['unResolved'],
        element['rating']['partial'],
        element['rating']['resolved']]

        let chartName = `chartName${index}`

        mainArr.push(element.title, chartName)

        this.dataArr.push(dataForDo)

        this.map.set(index, mainArr)

        setTimeout(() => {
          this.loadRatingGraph(this.dataArr[index], chartName)
        }, 1500)

      })
    })
  }

  loadRatingGraph = (data, chartName) => {
    const canvas = <HTMLCanvasElement>document.getElementById(chartName)
    const ctx = canvas.getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          backgroundColor: [
            'red',
            'yellow',
            'green'
          ],
          data: data
        }], labels: [
          'UnResolved', 'Partial', 'Resolved'
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    })
  }
}
