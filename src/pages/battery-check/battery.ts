import {Component, Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {BatteryStatus} from "@ionic-native/battery-status";


@Component({
  templateUrl: 'battery.html'
})


export class BatteryPage {


  loading: any;
  batteryInfo: any;
  bP: any;
  bC: any;
  rp: any;
  items: Array<{ batteryPercent: any, batteryConnect: any }>;
  subscription: any;

  constructor(private elementRef: ElementRef,
              private loadingCtrl: LoadingController,
              private platform: Platform,
              private batteryStatus: BatteryStatus) {


    this.loading = this.loadingCtrl.create();
    this.items = [];
  }


  BatteryCheck() {

    this.loading.present();

    this.subscription = this.batteryStatus.onChange().subscribe(status => {

      this.bP = status.level;
      this.bC = status.isPlugged;

      console.log("구독내용: ", this.items)

      this.loading.dismiss();

    })


    this.rp = this._repeat();
    // this._stop(this.rp);


  }


  BatteryCheckStop() {
    this.subscription.unsubscribe()
    clearInterval(this.rp);
    alert("사용자 요청으로 테스트 종료")

    this.items.splice(0,this.items.length)
  }

  _repeat() {
    return (
      setInterval(() => {

        this.items.push({
          batteryPercent: "남은 배터리: "+this.bP+"%",
          batteryConnect: "충전 중?: "+this.bC
        })
        console.log("level: : " + this.bP + " is Plugged: " + this.bC)

      }, 2000))
  }

  _stop(rp) {
    setTimeout(() => {
      this.subscription.unsubscribe();
      clearInterval(rp);
      alert("30초 초과. 테스트 중지")
    }, 30000)
  }

}

