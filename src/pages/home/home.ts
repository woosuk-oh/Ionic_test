import {Component} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import {Geolocation} from '@ionic-native/geolocation';
import {BatteryStatus} from "@ionic-native/battery-status";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {Camera, CameraOptions, CameraPopoverOptions} from "@ionic-native/camera";
import Util from './util'

// const util = Util.util

declare let WifiWizard2: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  curPlatform: any; // 현재 단말기 플랫폼 정보.
  config: any;
  saveSSID: any;
  savePw: any;
  delay: any;
  currentSSID: any;
  batteryPercent: any;

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private device: Device,
              private geolocation: Geolocation,
              private batteryStatus: BatteryStatus,
              private bluetoothSerial: BluetoothSerial,
              public alertCtrl: AlertController,
              private camera: Camera) {


    this.currentSSID= [];

    this.delay = 2000; // delay in ms for timeout

    this.platform.ready().then(() => {

      this.curPlatform = this.device.platform //단말기 플랫폼 가져오기
      if (this.curPlatform == "Android") {
        console.log("현재 이 기기는" + this.curPlatform);

        // this.cameraPic()
      }
      else if (this.curPlatform == "iOS") {

      }
    })
  }

  ionViewDidEnter() {}


  timeout() {
    let delay = parseInt(this.delay);
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay);
    });
  }


  cameraPic(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }


    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      this.displayErrorAlert(err);
    });
  }



  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }


  // openModal(){
  //   util.prototype.callModal()
  // }


}
