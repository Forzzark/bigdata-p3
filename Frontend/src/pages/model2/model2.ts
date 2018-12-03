import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Chart } from 'chart.js';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

/**
 * Generated class for the Model2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-model2',
  templateUrl: 'model2.html',
})
export class Model2Page {
  chart = []
  chart2 = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.setChart()
  }
  setChart() {
    this.dataProvider.getModel2Results().subscribe((res) => {
      console.log(res)
      let lines = res.split(/\n/)
      let labels:number[] = []
      let text:string[] = []
      let dictOnes = {flu: 0, headache:0, measles:0, trump:0,zika:0,ebola:0,diarrhea:0};
      let dictZeroes = {flu: 0, headache:0, measles:0, trump:0,zika:0,ebola:0,diarrhea:0};
      let dataOnes:number[] = [];
      let dataZeroes:number[] = [];
      let totalPositives =0
      let totalNegatives =0



      lines.forEach((element) => {
        labels.push(+(element.split(',')[0]))
        text.push(element.split(',')[1])

      })
      for(let i =0; i < text.length; i++){
        if(text[i].indexOf('flu') >=0){
          if(labels[i]==1){
            dictOnes.flu = dictOnes.flu + 1
          }else{
            dictZeroes.flu = dictZeroes.flu + 1
          }
        
        }else if(text[i].indexOf('measles') >=0){
          if(labels[i]==1){
            dictOnes.measles = dictOnes.measles + 1
          }else{
            dictZeroes.measles = dictZeroes.measles + 1
          }
        }else if(text[i].indexOf('headache') >=0){
          if(labels[i]==1){
            dictOnes.headache = dictOnes.headache + 1
          }else{
            dictZeroes.headache = dictZeroes.headache + 1
          }
        }else if(text[i].indexOf('diarrhea') >=0){
          if(labels[i]==1){
            dictOnes.diarrhea = dictOnes.diarrhea + 1
          }else{
            dictZeroes.diarrhea = dictZeroes.diarrhea + 1
          }
        }else if(text[i].indexOf('trump') >=0){
          if(labels[i]==1){
            dictOnes.trump = dictOnes.trump + 1
          }else{
            dictZeroes.trump = dictZeroes.trump + 1
          }
        }else if(text[i].indexOf('zika') >=0){
          if(labels[i]==1){
            dictOnes.zika = dictOnes.zika + 1
          }else{
            dictZeroes.zika = dictZeroes.zika + 1
          }
        }else if(text[i].indexOf('ebola') >=0){
          if(labels[i]==1){
            dictOnes.ebola = dictOnes.ebola + 1
          }else{
            dictZeroes.ebola = dictZeroes.ebola + 1
          }
        }
      }
      let labelsData = ["flu", 'ebola','diarrhea', 'headache', 'measles', 'trump', 'zika']
      dataOnes = [dictOnes.flu, dictOnes.ebola, dictOnes.diarrhea, dictOnes.headache, dictOnes.measles, dictOnes.trump, dictOnes.zika]
      dataZeroes= [dictZeroes.flu, dictZeroes.ebola, dictZeroes.diarrhea, dictZeroes.headache, dictZeroes.measles, dictZeroes.trump, dictZeroes.zika]
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: labelsData,
          datasets: [
            {
              label:"Positives",
              data: dataOnes,
              backgroundColor: "rgb(66, 134, 244)"
            },{
              label:"Negatives",
              data:dataZeroes,
              backgroundColor: "rgb(244, 65, 95)"
            }
          ]
        },
        options: {
          title:{
            display:true,
            text: "Positive vs Negative Classification per keyword"
          },
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                autoSkip: false
              }
            }],
            yAxes: [{
              display: true
            }]
          }
        }

      })
      labels.forEach((element)=>{
        totalPositives = totalPositives+element
      })
      totalNegatives = labels.length - totalPositives
      this.chart2 = new Chart('canvas2', {
        type: 'bar',
        data: {
          labels: ["Positives", "Negatives"],
          datasets: [
            {
              label:"Positives",
              data: [totalPositives, totalNegatives],
              backgroundColor: "rgb(66, 134, 244)"
            }
          ]
        },
        options: {
          title:{
            display:true,
            text: "Total Number of Positive vs Negative classifications"
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                autoSkip: false
              }
            }],
            yAxes: [{
              display: true
            }]
          }
        }

      })
      


    })
  }

}
