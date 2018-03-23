import {Component, OnInit} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {NetworkInterface} from '@ionic-native/network-interface';
import {Network} from '@ionic-native/network';



// import { Signal } from 'cordova-plugin-signal-strength'

declare var WifiWizard2:any;


@Component({
  templateUrl: 'network.html'
})


export class NetworkPage{




  wifiInfo: any;
  items: any[] = [];

  loading: any;

  constructor(private networkInterface: NetworkInterface,
              private network: Network,
              private loadingCtrl: LoadingController,
              private platform: Platform) {
    this.loading = this.loadingCtrl.create();
    this.items = [];


  }


  errorHandler(err: any) {
    alert(`Problem: ${err}`);
  }

  getSsidName() {
    WifiWizard2.getCurrentSSID((ssid: string) => alert(`Your SSID: ${ssid}`), this.errorHandler);
  }

  isWifiEnabled() {
    WifiWizard2.isWifiEnabled(truthy => alert(`Wifi Enabled: ${truthy}`), this.errorHandler);
  }

  listNetworks() {
    WifiWizard2.getScanResults(
      networks =>
      {
        // for(let net of networks){
        this.wifiInfo = networks;

        // }
      }/*alert(`Networks: ${JSON.stringify(networks)}`)*/, this.errorHandler);


    console.log(this.wifiInfo)


   /* this.wifiInfo.map((wf)=>{
      this.items.push(JSON.stringify(wf))
      console.log(wf)

    })*/
    // console.log(this.items)
  }



  watchNetworkInfoCheck() {
    this.platform.ready().then(() => {

      // cordova.plugins.WifiWizard.getCurrentSSID(onSuccess, onError);
      // (<any>window).plugins.WifiWizard.getCurrentSSID(onSuccess,onError)
      // (<any>window).plugins.SignalStrength.dbm(onSuccess)

    })




  }

}


