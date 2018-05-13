import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { NAV } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-sensor',
  templateUrl: 'sensor.html'
})
export class SensorDataPage {

  private RoomID : String =  "Please choose a room";
  private Presence : String;
  private Air: String;
  private Noise : String;
  public aktualisiert: Boolean = false;

  constructor(public navCtrl: NavController, 
              public events:Events, 
              private photoViewer: PhotoViewer, 
              private file: File, 
              public navParams: NavParams) {

    this.RoomID = navParams.get("id");
    this.Presence = navParams.get("Presence");
    this.Air = navParams.get("Air");
    this.Noise = navParams.get("Noise");
    this.aktualisiert = navParams.get("Actu");
    
    //events.subscribe('setRoomID', (id, presence, air, noise) => {
    //  this.setRoom(id, presence, air, noise);
    //})
  }


  public setRoom(id:String, presence:String, air:String, noise: String){
    this.RoomID = id;
    this.Presence = presence;
    this.Air = air;
    this.Noise = noise;
    this.aktualisiert = true;
  }

  showFullImage(img, title){
    this.photoViewer.show(this.file.applicationDirectory + img, title, {share: false});
   
  }

}
