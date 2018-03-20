import { Component } from '@angular/core';
import {Platform, ActionSheetController} from 'ionic-angular';

@Component({
    selector: 'action-sheets-basic-page',
    templateUrl: 'basic.html'
})
export class BasicPage{
    constructor(
        public platform: Platform,
        public actionsheetCtrl: ActionSheetController
    ){}

    openMenu(){
        let actionShet = this.actionsheetCtrl.create({
            title: '메뉴이름',
            cssClass:'action-sheets-basic-page',
            buttons:[
                {
                    text:'Delete',
                   // role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: () => {
                        console.log("Delete 클릭함");
                    }
                },
                {
                    text:'Share',
                    icon: !this.platform.is('ios') ? 'share' : null,
                    handler: () =>{
                        console.log("Share 눌림")
                    }
                },
                {
                    text:'Play',
                    icon:!this.platform.is('ios') ? 'arrow-dropright-circle':null,
                    handler:() => {
                        console.log('Play 눌림');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close': null,
                    handler: () => {
                        console.log('캔슬 눌림');
                    }
                }
            ]
        });
        actionShet.present();
    }
}