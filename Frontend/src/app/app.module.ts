import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http';
import { Model1Page } from '../pages/model1/model1';
import { Model2Page } from '../pages/model2/model2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Model1Page,
    Model2Page
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Model1Page,
    Model2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    DataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
