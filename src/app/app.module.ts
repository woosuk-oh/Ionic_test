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
import {BluetoothPage} from "../pages/bluetooth/bluetooth";
import {BlePage} from "../pages/ble/ble";
import {BleDetailPage} from "../pages/ble-details/ble-detail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { NetworkInterface } from '@ionic-native/network-interface';
import { BatteryStatus } from "@ionic-native/battery-status";
import {BluetoothSerial } from "@ionic-native/bluetooth-serial";
import {BLE} from "@ionic-native/ble";
import { NetworkContentPage } from '../pages/network-check/network';


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
    ListAdd,
    BluetoothPage,
    BlePage,
    BleDetailPage,
    NetworkContentPage


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
    BatteryPage,
    BluetoothPage,
    BlePage,
    BleDetailPage,
    NetworkContentPage
  ],
  providers: [
    BLE,
    BluetoothSerial,
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
