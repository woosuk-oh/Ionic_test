import {Component} from '@angular/core';
import {NavParams, LoadingController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  templateUrl: 'latlong.html'
})

export class LatlongPage {


  items: Array<{ lat: any, lng: any}>;

  lat: any;
  lng: any;
  rp: any;

  loading: any;

  constructor(public geolocation: Geolocation,
              public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();
    this.items = [];

  }


  tryGeolocation() {
    this.loading.present();

    let onSuccess = (postion) => {
      alert(
        'Lat' + postion.coords.latitude + '\n' +
        'Long' + postion.coords.longitude + '\n' +
        'Accuracy' + postion.coords.accuracy + '\n'
      );
      this.loading.dismiss();

    };

    let onError = (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
      );
      this.loading.dismiss();
    }


    navigator.geolocation.getCurrentPosition(onSuccess, onError);



  }

  watchGeolocation() {
    this.loading.present();




    let onSuccess = (postion) => {

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
    }

    this.rp = this._repeat();



    return navigator.geolocation.watchPosition(onSuccess, onError, {
      maximumAge: 30000
    })

  }

  stopGeolocation() {
    clearInterval(this.rp);
    alert("사용자 요청으로 테스트 종료")

    this.items.splice(0,this.items.length)
  }

  _repeat(){
    setInterval(()=>{
      this.items.push({
        lat: this.lat,
        lng: this.lng
      });
    }, 2000)
  }




}


