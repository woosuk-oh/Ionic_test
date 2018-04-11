import {Component} from '@angular/core';
import {AlertController, NavController, Platform, ToastController} from 'ionic-angular';
import {Device} from '@ionic-native/device';
import {Geolocation} from '@ionic-native/geolocation';
import {BatteryStatus} from "@ionic-native/battery-status";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {DomSanitizer} from '@angular/platform-browser';
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

  public photos: any;
  public base64Image: string;
  public processString: string;
  private urlPrefix: string = 'file://';
  private base64Prefix: string = 'data:image/jpeg;base64,';
  private sendImage: string;
  private imageblob: any;

  constructor(
    public domSanitizer: DomSanitizer,
    public navCtrl: NavController,
    private platform: Platform,
    private device: Device,
    private geolocation: Geolocation,
    private batteryStatus: BatteryStatus,
    private bluetoothSerial: BluetoothSerial,
    public alertCtrl: AlertController,
    private camera: Camera,
    private toastCtrl: ToastController,
  ) {


    this.currentSSID = [];

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

  ionViewDidEnter() {
  }


  ngOnInit() {
    this.photos = [];
  }


  timeout() {
    let delay = parseInt(this.delay);
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay);
    });
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
            //return true;
          }
        }
      ]
    });
    confirm.present();
  }

  choosePhoto() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then((imageData) => {
      // const safeUrl: any = this.domSanitizer.bypassSecurityTrustUrl(this.base64Prefix + imageData);
      const safeUrl: any = this.base64Prefix + imageData;
      this.sendImage = safeUrl;
      this.photos.push(safeUrl);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      // destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // this.base64Image = this.urlPrefix + imageData;
        const safeUrl: any = this.base64Prefix + imageData;
        this.photos.push(safeUrl);
        this.photos.reverse();
      },
      (err) => {
        console.log(err);
      });
  }

  uploadPhoto() {/*
    console.log('uploadPhoto click!');
    let storageRef = firebase.storage().ref();
    // let storageRef = firebase.storage().refFromURL('gs://moblile-base.appspot.com');
    this.processString = '';
    this.processString += 'get storage!';
    // this.showToast('get storage!');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    console.log('storageRef =>', storageRef.name);
    // Create a reference to 'images/todays-date.jpg'
    const imagesRef = storageRef.child('images');
    console.log('imagesRef =>', imagesRef);
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    // this.showToast('Create a reference!');
    this.processString += 'Create a reference!';
    console.log('Create a reference!');
    const metadata = {
      contentType: 'image/jpeg',
    };
    // imageRef.put(this.b64toBlob(this.imageblob, 'image/jpeg'), metadata)
    imageRef.putString(this.sendImage, firebase.storage.StringFormat.DATA_URL).then(
      (snapshot: any) => {
        // this.showToast('upload success!');
        this.processString += 'upload success!';
      },
      (err) => {
        console.log(err);
        this.processString += 'upload fail => ' + JSON.stringify(err);
        // this.showToast('upload fail => '+ JSON.stringify(err));
      });
  */
  }

  private b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  private showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
