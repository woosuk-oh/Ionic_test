import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { BasicPage } from '../pages/action-sheets/basic';
import { LatlongPage } from '../pages/geolocation/geolocation';
import { NetworkPage } from '../pages/network-check/network';
import { BatteryPage } from "../pages/battery-check/battery";
import { BluetoothPage } from "../pages/bluetooth/bluetooth";
import {BlePage} from "../pages/ble/ble";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic3333', component: HelloIonicPage },
      { title: 'My First List2', component: ListPage },
      { title: 'test', component: BasicPage },
      { title: 'gps Test', component: LatlongPage},
      { title: 'network test', component: NetworkPage},
      { title: 'battery test1', component: BatteryPage},
      { title: 'bluetooth test1', component: BluetoothPage},
      {title: 'BLE test1', component: BlePage},


    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
