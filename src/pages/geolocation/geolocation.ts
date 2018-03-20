import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    templateUrl:'latlong.html'
})

export class latlongPage {


    lat: any;
    lng: any;

    items: Array<{lat: string, lng: string}>;


    loading: any;

    constructor(
        public geolocation: Geolocation,
        public loadingCtrl: LoadingController

    ){
        this.loading = this.loadingCtrl.create();
        this.items = [];
        
    }


    tryGeolocation(){
        this.loading.present();

        let onSuccess = (postion) => {
            alert(
                'Lat'       + postion.coords.latitude + '\n' +
                'Long'      + postion.coords.longitude + '\n'+
                'Accuracy'  + postion.coords.accuracy + '\n' 
            );
            this.loading.dismiss();
        
        };

        let onError = (error) => {
            alert('code: ' +error.code + '\n' +
                   'message: ' + error.message + '\n'     
            );
            this.loading.dismiss();
        }

        this
        .geolocation.getCurrentPosition().then(pos=>{
            this.lat = pos.coords.latitude;
            this.lng = pos.coords.longitude;

        }).catch(err=> 
            {
                this.loading.dismiss();
                console.log(err)
            }
        )
            
        // navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // this.geolocation.getCurrentPosition().then((resp) => {
        //     let pos = {
        //         lat: resp.coords.latitude,
        //         lng: resp.coords.longitude
        //     };

        //     this.loading.dismiss();
        // }).catch((error) => {
        //     console.log('Error Getting Location ', error);
        //     this.loading.dismiss();
        // })


    }
    watchGeolocation(){
        this.loading.present();

        // let wt = this.geolocation.watchPosition();
        
        // wt.subscribe((data) => {
        //     let pos = {
        //         lat: data.coords.latitude,
        //         lng: data.coords.longitude
        //     }
        // })

        // wt.subscribe()

        // this.items.push()
        
        let onSuccess = (postion) => {
            alert(
                'Lat'       + postion.coords.latitude + '\n' +
                'Long'      + postion.coords.longitude + '\n'+
                'Accuracy'  + postion.coords.accuracy + '\n' 
            );
            this.loading.dismiss();
        
        };

        let onError = (error) => {
            alert('code: ' +error.code + '\n' +
                   'message: ' + error.message + '\n'     
            );
            this.loading.dismiss();
        }
        return navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true, timeout: 30000, maximumAge: 3000})
    }

    
}


