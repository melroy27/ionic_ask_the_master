import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, map, } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { BehaviorSubject } from 'rxjs';
import { AuthEndPoints } from '../const_endPoint'


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Post[] = [];
  public QuestionsUpdated = new Subject<Post[]>();
  public myData = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }


  getPosts = () => {
    let chips = new Map
    this.http.get<{ success: string, data: any }>
      (environment.appBaseUrl + AuthEndPoints.QUESTION_LIST)
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            id: post._id,
            active: post.active,
            title: post.title,
            askedOn: post.askedOn,
            askedBy: post.askedBy,
            carData: post.carData,
            category: post.category,
            domain: post.domain,
            rating: post.rating,
            sections: post.sections,
            subCategory: post.subCategory,
            totalAnswers: post.totalAnswers,
            totalRating: post.totalRating,
            unratedAnswers: post.unratedAnswers,
            ratedBy: post.ratedBy,
            chipsData: chips.set(0, post.category).set(1, post.domain).set(2, post.subCategory)
          }
        })
      }))
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.QuestionsUpdated.next([...this.posts]);
        this.myData.next(this.posts.length);
      });
  }

  getPostUpdateListener = () => {
    return this.QuestionsUpdated.asObservable();
  }

  getquestion = (id) => {
    let param = { "id": id }
    return this.http.get(environment.appBaseUrl + AuthEndPoints.QUESTION_LIST_SINGLE, { params: param });
  }

  addQuestion = (carData, domain, category, subCategory, askedBy, sections, title) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.QUESTION_CREATE, { carData, domain, category, subCategory, askedBy, sections, title })
  }

  updateQuestion = (id, carData, domain, category, subCategory, askedBy, sections, title) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.QUESTION_UPDATE, { id, carData, domain, category, subCategory, askedBy, sections, title })
  }

  changeRatingQuestion = (qid, newValue, userId, oldValue, position?) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.QUESTION_RATING, { qid, oldValue, newValue, userId, position })
  }

  changeRatingAnswer = (qid, aid, newValue, userId, oldValue, position?) => {
    return this.http.post(environment.appBaseUrl + AuthEndPoints.ANSWER_RATING, { qid, aid, oldValue, newValue, userId, position })
  }

  searchQuestionHome = (title?, filterOption?) => {
    let chips = new Map
    let params = {}
    if (!title && !filterOption) {
      params = {
        title: title,
        filter: filterOption
      }
    } else if (title && !filterOption) {
      params = {
        title: title
      }
    } else if (!title && filterOption) {
      params = {
        filter: filterOption
      }
    } else if (title && filterOption) {
      params = {
        title: title,
        filter: filterOption
      }
    }
    return this.http.get<{ status: string, message: string, data: any }>(environment.appBaseUrl + AuthEndPoints.QUESTION_SEARCH,
      {
        params: params
      }
    )
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            id: post._id,
            active: post.active,
            title: post.title,
            askedOn: post.askedOn,
            askedBy: post.askedBy,
            carData: post.carData,
            category: post.category,
            domain: post.domain,
            rating: post.rating,
            sections: post.sections,
            subCategory: post.subCategory,
            totalAnswers: post.totalAnswers,
            totalRating: post.totalRating,
            unratedAnswers: post.unratedAnswers,
            ratedBy: post.ratedBy,
            chipsData: chips.set(0, post.category).set(1, post.domain).set(2, post.subCategory)
          }
        })
      }))
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.QuestionsUpdated.next([...this.posts]);
      })
  }

  getCarData = () => {
    return this.http.get(environment.appBaseUrl + AuthEndPoints.CAR_LIST);
  }
  getDomain = () => {
    return this.http.get(environment.appBaseUrl + AuthEndPoints.DOMAIN_LIST)
  }
  
}
