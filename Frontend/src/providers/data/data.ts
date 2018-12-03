import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getModel1Results(){
    return this.http.get('assets/data/p3/model1Predictions.csv' , {responseType: 'text'})
  }

  getModel2Results(){
    return this.http.get('assets/data/p3/model2Predictions.csv' , {responseType: 'text'})
  }

}
