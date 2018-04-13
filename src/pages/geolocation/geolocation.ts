import {Component} from '@angular/core';
import {NavParams, LoadingController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  templateUrl: 'latlong.html'
})

export class LatlongPage {


  items: Array<{ lat: any, lng: any }>;

  lat2: any;
  lng2: any;
  rp: any;
  subscription: any;

  loading: any;

  constructor(public geolocation: Geolocation,
              public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
    this.items = [];

  }


  watchGeolocation() {
    this.loading.present();

    /*  let onSuccess = (postion) => {

        this.lat = postion.coords.latitude;
        this.lng = postion.coords.longitude;

        console.log(postion.coords.latitude)

        this.loading.dismiss();

      };

      let onError = (error) => {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n'
        );
        this.loading.dismiss();
      }*/

    this.rp = this._repeat();

    //navigator.geolocation.watchPosition(onSucess, onError, {timeout:3000})

    this.subscription = this.geolocation.watchPosition({timeout: 10000});
    this.subscription.subscribe((data) => {
      this.lat2 = data.coords.latitude;
      this.lng2 = data.coords.longitude;

      console.log(data.coords.latitude)
      this.loading.dismiss();


    });

    if (this.lat2 == null || this.lat2 == undefined) {
      setTimeout(() => {
        this.loading.dismiss();
        alert("5초 이상 응답이 없습니다. location 정보를 재요청 합니다..")
      }, 5000)

    }

  }

  stopGeolocation() {
    // this.subscription.unsubscribe();
    clearInterval(this.rp);
    alert("사용자 요청으로 테스트 종료")

    this.items.splice(0, this.items.length)
  }

  _repeat() {
    return (
      setInterval(() => {
        this.items.push({
          lat: this.lat2,
          lng: this.lng2
        });
      }, 2000)
    )
  }


}
