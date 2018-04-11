import {ModalController, ViewController} from "ionic-angular";

export class util {

  constructor(public modal: ModalController,
              public viewCtrl: ViewController) {

  }


  callModal(on, off, data) {

    // this.loading.present();
    let modal

    on((page)=>{
      modal = this.modal.create(page);
      modal.present();

    })

    off(() => {
      this.viewCtrl.dismiss(modal)

    })
    // this.loading.dismiss();
  }


}

/*
function _loop(func1, func2) {
  this._repeat()
  this._stop(_repeat)

}


function _repeat() {
  return (
    setInterval(() => {




      // console.log("ssid값: "+this.ssid)
    }, 500)
  )
}

function _stop(rp) {
  setTimeout(() => {
    clearInterval(rp)
  }, 300000)

}
*/
