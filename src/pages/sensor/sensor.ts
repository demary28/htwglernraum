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

  private RoomID : String =  "Bitte wähle einen Raum aus";
  private Presence : String;
  private Air: Number;
  private Noise : Number;
  public aktualisiert: Boolean = false;
  private bewertung: String;

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
    this.setBewertung();
    
    //events.subscribe('setRoomID', (id, presence, air, noise) => {
    //  this.setRoom(id, presence, air, noise);
    //})
  }

  setBewertung(){
    switch (true){
      case (this.Presence=="not detected" && this.Air<=1400 && this.Noise<=62):{
        this.bewertung = "Room seems to be free. Recommendation: Take this room";
        break;
      }
      case (this.Presence=="not detected" && this.Air<=1400 && this.Noise>=62):{
        this.bewertung = "Room seems to be very noisy. Maybe there are roadworks nearbby. Recommendation: Look for another room";
        break;
      }
      case (this.Presence=="detected" && this.Air<=1400 && this.Noise<=62):{
        this.bewertung = "Seems that only a few persons are woking in this room quietly. Recommendation: Take this room";
        break;
      }
      case (this.Presence=="detected" && this.Air<=1400 && this.Noise<=62):{
        this.bewertung = "Seems that many persons are woking in this room, so the Air is bad. Recommendation: Look for another room";
        break;
      }
      case (this.Presence=="detected" && this.Air<=1000 && this.Noise>=62):{
        this.bewertung = "Seems that either many people are working in that room with open window or few people loudly. Recommendation: Give it a try, when you have headphones :)";
        break;
      }
      case (this.Presence=="detected" && this.Air>=1000 && this.Noise>=62):{
        this.bewertung = "Seems that the persons in this room are woking loud. Recommendation: Look for another room";
        break;
      }

    }
  

  }

  showFullImage(img, title){
    this.photoViewer.show(this.file.applicationDirectory + img, title, {share: false});
   
  }

}
