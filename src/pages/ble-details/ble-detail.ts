import {Component, NgZone} from '@angular/core';
import {LoadingController, Platform, NavController, NavParams} from 'ionic-angular';
import {BLE} from "@ionic-native/ble";
import {ToastController} from "ionic-angular";

@Component({
  templateUrl: 'ble-detail.html'
})

export class BleDetailPage {

  loading: any;
  peripheral: any = {};
  statusMessage: string;

  bleDetailInfo: any;

  constructor(private loadingCtrl: LoadingController,
              private platform: Platform,
              private ble: BLE,
              private toastCtrl: ToastController,
              private ngZone: NgZone,
              private navCtrl: NavController,
              private navParams: NavParams,) {
    let device = navParams.get('device');

    this.ble.connect(device.id).subscribe(
      (peripheral) => {this.onConnected(peripheral)},
      (peripheral) => {this.onDeviceDisconnected(peripheral)}
    )
    this.loading = this.loadingCtrl.create();
  }

  bleDetailCheck() {
    this.platform.ready().then(() => {

    })

    let onSuccess = (res) => {
      this.bleDetailInfo = JSON.stringify(res)
      console.log("ble-detail test: " + this.bleDetailInfo)

      this.loading.dismiss();
    }

    let onError = (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
      );
      this.loading.dismiss();
    }

  }

  onConnected(peripheral){
    this.ngZone.run(
      () => {
        this.setStatus('');
        this.peripheral = peripheral;
      }
    )
  }

  onDeviceDisconnected(peripheral){
    let toast = this.toastCtrl.create({
      message: '연결 끊어짐',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => {'Disconnected ' + JSON.stringify(this.peripheral)},
      () => {'Error disconnecting ' + JSON.stringify(this.peripheral)}
    )
  }

  setStatus(message){
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    })
  }
}
