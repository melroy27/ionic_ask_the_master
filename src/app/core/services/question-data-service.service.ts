import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataServiceService {

  globalCounter: number = 0;
  editMode = false;
  hasEnteredBefore = false

  filterData = new BehaviorSubject<any[]>([]);

  constructor() { }
  // global counter for the components
  setGlobalCounter = (count) => {
    this.globalCounter = count;
  }

  getGlobalCounter = () => {
    return this.globalCounter;
  }

  // store editmode
  setEditMode = (data: boolean) => {
    this.editMode = data
  }

  // retrive editMode
  getEditMode = () => {
    return this.editMode;
  }

  getFilterData = () => {
    return this.filterData;
  }
  setFilterData = (data) => {
    this.filterData = data;
  }

  get allFilter() {
    return this.filterData.asObservable();
  }

  getHasEnteredBefore = () => {
    return this.hasEnteredBefore;
  }
  setHasEnteredBefore = (data) => {
    this.hasEnteredBefore = data;
  }
}
