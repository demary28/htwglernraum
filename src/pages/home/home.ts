import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SensorDataPage } from '../sensor/sensor';
import { asProviderData } from '@angular/core/src/view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SensorDataPage]
})

export class HomePage {

  constructor(public navCtrl: NavController, public sensData: SensorDataPage) {

  }


  showRoomInfo(id:String){
     this.sensData.setRoomID(id); 
    this.navCtrl.parent.select(1);
  }

}
