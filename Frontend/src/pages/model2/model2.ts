import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Chart } from 'chart.js';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Model2Page');
  }
  setChart() {
    this.dataProvider.getModel1Results().subscribe((res) => {
      let lines = res.split(/\n/)
      let labels = []
      let data = []

      lines.forEach((element) => {
        labels.push(element.split(',')[0])
        data.push(element.split(',')[1])

      })
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
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
