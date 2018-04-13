import {Component, NgZone} from '@angular/core';
import {LoadingController, Platform, NavController, AlertController} from 'ionic-angular';
import {BLE} from "@ionic-native/ble";
import {BleDetailPage} from "../ble-details/ble-detail";


@Component({
  templateUrl: 'ble.html'
})

export class BlePage {

  loading: any;
  bleInfo: any;
  devices: any[] = [];
  isconnected: any[] = [];
  statusMessage: string;
  i: 0;

  constructor(private loadingCtrl: LoadingController,
              private platform: Platform,
              private ble: BLE,
              private ngZone: NgZone,
              private navCtrl: NavController,
              private alertCtrl: AlertController,) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidEnter() {
    console.log('ionview Did Enter');
    this.scan();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });

  }


  scan() {
    this.platform.ready().then(() => {

      this.devices = [];
      this.ble.startScan([]).subscribe(onSuccess, onError);

      console.log('Scanning for Bluetooth LE Devices');
      this.loading.present();

    })

    let onSuccess = (res) => {
      this.bleInfo = JSON.stringify(res)
      console.log("bleInfo: " + this.bleInfo)
      this.onDiscoveredDevice(res);

      /*res.forEach((res, i) => {
        this.connectedCheck(res[i].id, i);
      })*/


      /*
       res.keys(res).forEach((key,index)=>{
         this.connectedCheck(key[index].id, index);
       })
 */
      this.loading.dismiss();
    }

    let onError = (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
      );
      // this.showAlert('Scan Failed', 'Error scanning for BLE devices.')

      this.loading.dismiss();
    }

  }

  stopScan() {
    this.ble.stopScan();

  }

  connectedCheck(deviceId,index) {

    let promise = this.ble.isConnected(deviceId)

    promise.then((connected)=> {
      console.log("프라미스 conn")
      this.devices.push({connected_status: connected})
      // this.devices[index] = this.devices[index] + {connected_status: connected}
      // this.isconnected.push(connected)
      this.devices.concat({connected_status: connected})

    }, (notConnected)=> {
      console.log("프라미스 not conn")
      // alert("연결에러: "+err)
      this.devices.push({connected_status: notConnected})
      // this.devices[index] = this.devices[index] + {connected_status: notConnected}
      // this.isconnected.push(notConnected)
      // this.devices.concat({connected_status: notConnected})

    })




  /*
        console.log("연결됐냐? " + res)
        if (res == false) {
          this.devices[index].push({connected_status: "연결됨"})
        }
        else {
          this.devices[index].push({connected_status: "연결 안됨"})
        }
      });*/

  }

  onDiscoveredDevice(device) { //device json 값이 하나씩 들어오는듯.
    // console.log('Discovred' + JSON.stringify(device, null, 2));

    this.devices.push(device);
    this.connectedCheck(device.id, this.i++)
    // this.devices.concat(this.isconnected)

    console.log(this.devices);

    /*  for(let data of device){*/

    // console.log("연결체크하기전: " + device.id)

  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + 'selected');
    this.navCtrl.push(BleDetailPage, {
      device: device
    });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
