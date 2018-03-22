import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListAdd } from "../pages/pipes/list-add";

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { BasicPage } from '../pages/action-sheets/basic';
import { LatlongPage } from '../pages/geolocation/geolocation';
import { NetworkPage } from '../pages/network-check/network';
import {BatteryPage} from "../pages/battery-check/battery";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { NetworkInterface } from '@ionic-native/network-interface';
import { BatteryStatus } from "@ionic-native/battery-status";



@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    BasicPage,
    LatlongPage,
    NetworkPage,
    BatteryPage,
    ListAdd


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    BasicPage,
    LatlongPage,
    NetworkPage,
    BatteryPage
  ],
  providers: [
    BatteryStatus,
    Network,
    NetworkInterface,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
