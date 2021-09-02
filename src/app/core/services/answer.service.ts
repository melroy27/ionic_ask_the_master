import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthEndPoints } from '../const_endPoint';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http: HttpClient) { }

  addAnswer = (qid, sections, title, answeredBy) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.ANSWER_CREATE, { qid, sections, title, answeredBy })
  }

  getAnswerOnQuestion = (qid) => {
    let param = { "qid": qid }
    return this.http.get<{ success: string, data: any }>(environment.appBaseUrl + AuthEndPoints.ANSWER_ON_QUESTION, { params: param })
  }

  updateAnswer = (qid, aid, answeredBy, sections, title) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.ANSWER_UPDATE, { qid, aid, answeredBy, sections, title })
  }

  getAnswerList = () => {
    return this.http.get(environment.appBaseUrl + AuthEndPoints.ANSWER_LIST)
  }
  getMasterRating = (masterId) => {
    const params = {
      masterId: masterId
    }
    return this.http.get(environment.appBaseUrl + '/rating/master', {
      params: params
    })
  }
}
