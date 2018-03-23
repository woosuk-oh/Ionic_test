import {Component, OnInit} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {NetworkInterface} from '@ionic-native/network-interface';
import {Network} from '@ionic-native/network';
// import { Signal } from 'cordova-plugin-signal-strength'

// declare var WifiWizard:any;

declare let window: any;

@Component({
  templateUrl: 'network.html'
})


export class NetworkPage implements OnInit{
  ngOnInit(){
    // (<any>window).plugins.WifiWizard.
  }


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

      // cordova.plugins.WifiWizard.getCurrentSSID(onSuccess, onError);
      // (<any>window).plugins.WifiWizard.getCurrentSSID(onSuccess,onError)
      (<any>window).plugins.SignalStrength.dbm(onSuccess)

    })


    let onSuccess = (res) => {
      this.wifiInfo = JSON.stringify(res)
      console.log("wifi test: " + this.wifiInfo)

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


