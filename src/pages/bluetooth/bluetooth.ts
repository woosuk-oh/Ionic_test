import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import {BluetoothSerial } from "@ionic-native/bluetooth-serial";


@Component({
    templateUrl: 'bluetooth.html'
})

export class BluetoothPage {

    loading: any;
    result: any;
    bluetoothInfo: any;
  items: Array<{ name: any, address: any, uuid: any, class: any }>;



  constructor(
        private loadingCtrl: LoadingController,
        private platform: Platform,
        private bluetoothSerial: BluetoothSerial
    )
    {
        this.loading = this.loadingCtrl.create();
        this.items = [];
    }
    bluetoothCheck() {
      this.loading.present();


      this.result = this.bluetoothSerial


    let onSuccess = (res) => {
      res.map( (p) => {

        this.items.push({
          name: p.name,
          address: p.address,
          uuid: p.id,
          class: p.class
        })

      })
      // this.bluetoothInfo = JSON.stringify(res)
      console.log("bluetooth test: " + this.bluetoothInfo)

      this.loading.dismiss();
    }

    let onError = (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
      );
      this.loading.dismiss();
    }

      this.result.list(onSuccess,onError)


    }
}
