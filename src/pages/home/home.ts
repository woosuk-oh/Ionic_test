import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import {Geolocation} from '@ionic-native/geolocation';
import {BatteryStatus} from "@ionic-native/battery-status";


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
              private batteryStatus: BatteryStatus) {


    this.currentSSID= [];

    this.delay = 2000; // delay in ms for timeout






    let bP;

    this.platform.ready().then(() => {
      this.batteryStatus.onChange().subscribe(status => {
        bP = status.level

      })


      setInterval(()=>{
        // if(this.batteryPercent != undefined || this.batteryPercent != null){
          this.batteryPercent = bP
          alert(this.batteryPercent )
        // }

      },1000)



    })


    this.platform.ready().then(() => {


      this.curPlatform = this.device.platform //단말기 플랫폼 가져오기
      if (this.curPlatform == "Android") {
        console.log("현재 이 기기는" + this.curPlatform);


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


}
