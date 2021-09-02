import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpecialfunctionsService } from '../../../../core/services/specialfunctions.service';
import { PostService } from '../../../../core/services/posts.service';
import { QuestionDataServiceService } from '../../../../core/services/question-data-service.service'
import { LocalStorage } from '../../../../core/storage/local-storage';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  form = [];
  selectedRadioItem: any;
  previouslySelectedValue;

  constructor(public qds: QuestionDataServiceService,
    public postsService: PostService, public lclStr: LocalStorage, public popCtrl: PopoverController,) { }

  ngOnInit() {
    console.log('previously selected value ->', this.previouslySelectedValue)

    let count = 1
    let tempObj = {}
    let filterData = this.lclStr.getDomainData();

    filterData.forEach((element) => {
      if (this.previouslySelectedValue == element['name']) {

        tempObj = {
          'id': count,
          'name': 'radio_list',
          'value': element['name'],
          'text': element['name'],
          'checked': true,
        }

      } else {
        tempObj = {
          'id': count,
          'name': 'radio_list',
          'value': element['name'],
          'text': element['name'],
          'checked': false,
        }
      }
      this.form.push(tempObj)
      count++
    });

  }

  radioSelect(event) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;

    this.popCtrl.dismiss(this.selectedRadioItem, null, 'filter');
  }

}
