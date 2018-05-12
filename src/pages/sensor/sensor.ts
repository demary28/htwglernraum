import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorDataPage {

  private RoomID : String =  "Please choose a room";
  private Presence : String;
  private Air: String;
  private Noise : String;

  constructor(public navCtrl: NavController, public events:Events) {
    events.subscribe('setRoomID', (id, presence, air, noise) => {
      this.setRoom(id, presence, air, noise);
    })
  }


  public setRoom(id:String, presence:String, air:String, noise: String){
    this.RoomID = id;
    this.Presence = presence;
    this.Air = air;
    this.Noise = noise;
  }

}
