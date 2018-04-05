import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


declare let WifiWizard2: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  config: any;
  SSID: any;
  delay: any;
  currentSSID: any;

  constructor(public navCtrl: NavController,
              private platform: Platform) {

    this.delay = 2000; // delay in ms for timeout


  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Start")

    this.platform.ready().then(async () => {

      // this.getWifiSSID()

      await this.getCurrentSSID()/*.then(()=>{
        alert("view Did Load SSID: "+this.currentSSID)

      }).then(()=>{
        this.disconnectWIFI(this.currentSSID)

      }).then(()=>{
        this.doConnect()

      })

*/



      // this.connect(sid)
    })
  }

  async getCurrentSSID() {


    try {
      await this.timeout();

      await WifiWizard2.getCurrentSSID((ssid: string) => {/*(alert(`Your SSID: ${ssid}`))*/
        this.currentSSID = `${ssid}`
        alert("현재 연결된 와이파이 가져옴: "+this.currentSSID)
        this.disconnectWIFI(this.currentSSID)

      }, (err: any) => {
        this.currentSSID = `${err}`
        alert("현재 연결된 와이파이 가져오는 도중 fail. "+ err)
      });
      /*
            await WifiWizard2.getConnectedSSID((r) => {
              alert("현재 연결된 와이파이명: " + r)
              this.currentSSID = r
              // this.getWifiSSID(r)

            }, (e) => {
              alert("연결된 와이파이 가져오는 도중 에러 발생: " + e)
            })
      */
    } catch (e) {
      alert("연결된 와이파이 가져오는 도중 에러 발생: " + e)
    }

  }
  async disconnectWIFI(ssid){
    alert("와이파이 가져온 후 연결해제 시도중..")

    try{
      await this.timeout();

      await WifiWizard2.iOSDisconnectNetwork(ssid, (r)=>{
        alert(ssid +"와의 연결 해제 됨: "+ r)
        this.doConnect()



      }, (e)=>{
        alert("연결 해제 도중 에러 발생"+e )
      })

    }catch (e) {

    }
  }

  async getWifiSSID(ssid) {

    this.SSID = ssid
    this.connect(this.SSID, "dlsqps2017@@", "WPA")

    /*

        try {
          WifiWizard2.getCurrentSSID((ssid: string) => {/!*(alert(`Your SSID: ${ssid}`))*!/
            this.SSID = `${ssid}`
            this.connect(this.SSID, "dlsqps2017@@", "WPA")
            // console.log("getWIFI: ", sid)
            // return sid



          }, (err: any) => {formatWifiConfig
            alert("wifi 가져오는 중에 에러발생: "+`${err}`)
            // return sid
          });

        }catch (e) {
          console.log("와이파이 정보 가져오는 중에 에러 발생",e)
        }

    */


  }

  async connect(ssid, pw, algorithm) {
    try {
      await this.timeout();

      this.config = WifiWizard2.formatWifiConfig(ssid, pw, algorithm)

      console.log(this.config)

      await this.add();
      await this.doConnect();

    } catch (e) {
      console.log("wifi connect catch error", e);
      throw new Error(e.message)
    }

  }

  async add() {
    await this.timeout();


    try {
      await WifiWizard2.addNetworkAsync(this.config)
      // alert("add true")
      return true;

    } catch (e) {
      alert("Fail to add device WIFI network to your mobile device. please try again" + e)
    }


  }

  async doConnect() {

    alert("연결해제 완료 후 다른 와이파이 연결 시도중...")


    await this.timeout();


    try {
      this.SSID = "IVTSDEV"

      // await WifiWizard2.androidConnectNetworkAsync(this.SSID)
      // alert("doConnect true")
      await WifiWizard2.iOSConnectNetworkAsync(this.SSID, "dlsqps2017@@"/*, (r) => {

        alert("연결 성공: " + r)
      }, (e) => {
        alert("연결실패: " + e)
      }*/)


      return true
    } catch (e) {
      // throw new Error
      alert("Failed to connect to device WiFi SSID " + this.SSID + e);

    }

  }

  timeout() {
    let delay = parseInt(this.delay);
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, delay);
    });
  }


}
