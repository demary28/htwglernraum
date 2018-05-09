import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorDataPage {

  public RoomID : String =  "Please choose a room";

  constructor(public navCtrl: NavController) {

  }

  public setRoomID(id:String){
    this.RoomID = id;
  }

}
