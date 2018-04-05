import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Device} from '@ionic-native/device';


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

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private device: Device) {

    this.delay = 2000; // delay in ms for timeout

    this.platform.ready().then(async () => {
      this.curPlatform = this.device.platform //단말기 플랫폼 가져오기

      // alert(this.curPlatform)
      if (this.curPlatform == "Android") {
        await console.log("현재 이 기기는" + this.curPlatform);
        await this.getCurrentSSID()
        // await this.timeout();
        await this.connect("IVTSDEV", "dlsqps2017@@", "WPA")
        await this.add()
        await this.doConnect()
      }
      else if (this.curPlatform == "iOS") {
        alert("현재 이 기기는" + this.curPlatform);
        await this.getCurrentSSID()
      }
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Start")


  }


  async getCurrentSSID() {

    try {
      await this.timeout();

      await WifiWizard2.getCurrentSSID(async(ssid: string) => {/*(alert(`Your saveSSID: ${ssid}`))*/
        this.currentSSID = `${ssid}`
        alert("현재 연결된 와이파이 가져옴: " + this.currentSSID)
        await this.disconnectWIFI(this.currentSSID) // 해당 정보로 연결해제 시도

        return true

      }, (e: any) => {
        this.currentSSID = `${e}`
        alert("와이파이 연결 안됨. " + e)
      });

    } catch (e) {
      alert("연결된 와이파이 가져오는 도중 에러 발생: " + e)
    }


  }

  async disconnectWIFI(ssid) {

    try {
      await this.timeout();
      alert("와이파이 가져온 후 " + ssid + "와 연결해제 시도중..")


      if (this.curPlatform == "iOS") {
        await WifiWizard2.iOSDisconnectNetwork(ssid, (r) => {
          alert(ssid + "와의 연결 해제 됨: " + r)
          return true
        }, (e) => {
          alert("연결 해제 도중 에러 발생" + e)
          return false
        })
      }

      else if (this.curPlatform == "Android") {
        await WifiWizard2.androidDisconnectNetwork(ssid, (r) => {
          alert(ssid + "와의 연결이 해제 됨: " + r)
          return true

        }, (e) => {
          alert("연결 해제 도중 에러 발생" + e)
          return false
        })
      }


    } catch (e) {

    }

    return true
  }


  async connect(ssid, pw, algorithm) {
    this.saveSSID = ssid
    this.savePw = pw

    try {
      await this.timeout();

      this.config = WifiWizard2.formatWifiConfig(ssid, pw, algorithm)

      await alert("와이파이 정보 포맷팅 완료.")
      console.log(this.config)
      return true


    } catch (e) {
      console.log("wifi connect catch error", e);
      throw new Error(e.message)
    }


  }

  async add() {
    try {
      await this.timeout();

      WifiWizard2.addNetworkAsync(this.config)
      alert(this.currentSSID + " 와이파이 정보 등록 완료.")

      return true;

    } catch (e) {
      alert("Fail to add device WIFI network to your mobile device. please try again" + e)

    }


    return true
  }

  async doConnect() {

    alert("등록한 와이파이 중 " + this.saveSSID + "와 연결 시도중...")


    try {
      await this.timeout();

      // await WifiWizard2.androidConnectNetworkAsync(this.saveSSID)
      // alert("doConnect true")


      if (this.curPlatform == "iOS") {
        await WifiWizard2.iOSConnectNetwork(this.saveSSID, this.savePw, (r) => {

          alert("연결 성공: " + r)
          return true

        }, (e) => {
          alert("연결실패: " + e)
          return false

        })

      }
      else if (this.curPlatform == "Android") {
        await WifiWizard2.androidConnectNetwork(this.saveSSID, (r) => {

          alert("연결 성공: " + r)
          return true

        }, (e) => {
          alert("연결실패: " + e)
          return false

        })


      }
    } catch (e) {
      // throw new Error
      alert("Failed to connect to device WiFi saveSSID " + this.saveSSID + e);

    }

    return

  }

  timeout() {
    let delay = parseInt(this.delay);
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay);
    });
  }


}
