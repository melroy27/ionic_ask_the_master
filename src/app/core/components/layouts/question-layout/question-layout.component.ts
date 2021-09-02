import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-layout',
  templateUrl: './question-layout.component.html',
  styleUrls: ['./question-layout.component.scss'],
})
export class QuestionLayoutComponent implements OnInit {
  colors = ['red', 'yellow', 'green'];
  constructor() { }

  ngOnInit() { }

}
