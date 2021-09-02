import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Animation, AnimationController, IonTabs } from '@ionic/angular';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  @ViewChild('myTabs') tabs: IonTabs;
  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }
  getSelectedTab() {
    console.log(this.tabs.getSelected());
  }
}