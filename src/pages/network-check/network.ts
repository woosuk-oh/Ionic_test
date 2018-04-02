import {Component, OnInit} from '@angular/core';
import {LoadingController, Platform, ModalController, ViewController, NavParams} from 'ionic-angular';
import {NetworkInterface} from '@ionic-native/network-interface';
import {Network} from '@ionic-native/network';

import {platformBrowserTesting} from "@angular/platform-browser/testing";


// import { Signal } from 'cordova-plugin-signal-strength'

declare var WifiWizard2: any;
declare var cordovaNetworkManager: any;
// declare var Signal: any;
declare var SignalStrength: any;


@Component({
  templateUrl: 'network.html'
})


export class NetworkPage {


  wifiInfo: any;
  items: any[] = [];


  loading: any;

  constructor(private networkInterface: NetworkInterface,
              private network: Network,
              private loadingCtrl: LoadingController,
              private platform: Platform,
              private modal: ModalController) {
    this.loading = this.loadingCtrl.create();
    this.items = [];


  }


  openModal(characterNum) {

    let modal = this.modal.create(NetworkContentPage, characterNum);
    modal.present();
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

 /* getConncetdSSid() {

    this.platform.ready().then(() => {

        // 5초후에 2초에 한번씩 dbm 모니터링. 30초까지만 진행.
        let signalInterval;


        setTimeout(() => {
            signalInterval = setInterval(() => {
              SignalStrength.dbm((measureDbm) => {
                console.log('current dbm: ' + measureDbm);
              })
            }, 2000)
          },
          5000);

        setTimeout(() => {
          clearInterval(signalInterval)
        }, 30000)


      }
    )


    //cordovaNetworkManager.getConnectedSSID((ssid: string) => alert(`wifi strength: ${ssid} `), this.errorHandler);
    //지원하지 않는 플러그인. (3.0.0 버전으로 업데이트 필요 -> 업데이트 방법 찾는 중)
  }*/

  listNetworks() {
    WifiWizard2.getScanResults(
      networks => {
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


@Component({
  templateUrl: 'network-content.html'
})

export class NetworkContentPage {

  dbmData: any[] = [];

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {

      this.dbmData = [];

    this.signalMonitoring();

  }
  signalMonitoring() {
    this.platform.ready().then(() => {

      // 5초후에 2초에 한번씩 dbm 모니터링. 30초까지만 진행.
      let signalInterval;


      setTimeout(() => {
          signalInterval = setInterval(() => {

            SignalStrength.dbm((measureDbm) => {
              console.log('current dbm: ' + measureDbm);
              this.dbmData.push(measureDbm);
              // console.log(dbmData);

            })
          }, 2000)
        },
        3000);

      setTimeout(() => {
        clearInterval(signalInterval)
      }, 30000)
    })
  }
 /* dismiss() {
    this.viewCtrl.dismiss();
  }*/
}

