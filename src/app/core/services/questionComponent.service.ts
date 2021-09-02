import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class QuestionComponentService {
  components = new BehaviorSubject<any[]>([]);
  status = new BehaviorSubject<any[]>([]);
  index = new BehaviorSubject(undefined);
  constructor() { }

  get allcomponent() {
    return this.components.asObservable();
  }
  get allStatus() {
    return this.status.asObservable();
  }
  get allIndex() {
    return this.index.asObservable();
  }

  deleteSub() {
    this.components.complete();
  }
}
