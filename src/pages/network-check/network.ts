import {Component} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {NetworkInterface} from '@ionic-native/network-interface';
import {Network} from '@ionic-native/network';
// import { Signal } from 'cordova-plugin-signal-strength'

declare var cordova;

@Component({
  templateUrl: 'network.html'
})


export class networkPage {


  items: Array<{ lte: any, wifi: any, sensitivity: any }>;
  wifiInfo: any;
  loading: any;

  constructor(private networkInterface: NetworkInterface,
              private network: Network,
              private loadingCtrl: LoadingController,
              private platform: Platform) {
    this.loading = this.loadingCtrl.create();
    this.items = [];

  }


  watchNetworkInfoCheck() {
    this.platform.ready().then(() => {

      cordova.plugins.WifiWizrd.getCurrentSSID(onSuccess, onError);

    })


    let onSuccess = (res) => {
      this.wifiInfo = res
      console.log("wifi test: " + res)

      this.loading.dismiss();
    }

    let onError = (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
      );
      this.loading.dismiss();
    }



  }

}


