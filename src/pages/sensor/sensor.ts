import { Component } from '@angular/core';
import { NavController, Events, NavParams, AlertController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { SensorHelpPage } from '../sensorHelp/SensorHelp';

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
  private limitNoiseGood: Number;
  private limitAirGood: Number;
  private limitAirOK: Number;

  public presenceColor: String;
  public noiseColor: String;
  public airColor: String;


  constructor(public navCtrl: NavController, 
              public events:Events, 
              private photoViewer: PhotoViewer, 
              private file: File, 
              public navParams: NavParams, 
              private alertCtrl: AlertController) {

    this.RoomID = navParams.get("id");
    this.Presence = navParams.get("Presence");
    this.Air = navParams.get("Air");
    this.Noise = navParams.get("Noise");
    this.aktualisiert = navParams.get("Actu");
    this.limitNoiseGood = navParams.get("limitNoiseGood");
    this.limitAirGood = navParams.get("limitAirGood");
    this.limitAirOK = navParams.get("limitAirOK");
    this.setBewertung();
    this.makeItColorfull();
  }

  setBewertung(){
    switch (true){
      case (this.Presence=="not detected" && this.Air>=this.limitAirGood && this.Noise<=this.limitNoiseGood):{
        this.bewertung = "Room seems to be free. Recommendation: Take this room";
        break;
      }
      case (this.Presence=="not detected" && this.Air>=this.limitAirOK && this.Noise>=this.limitNoiseGood):{
        this.bewertung = "Room seems to be very noisy. Maybe there are roadworks nearbby. Recommendation: Look for another room";
        break;
      }
      case (this.Presence=="not detected" && this.Air<=this.limitAirOK && this.Noise<=this.limitNoiseGood):{
        this.bewertung = "Room seems to be free but the airquality is bad. Recommendation: Give it a try and open a window";
        break;
      }
      case (this.Presence=="detected" && this.Air>=this.limitAirOK && this.Noise<=this.limitNoiseGood):{
        this.bewertung = "Seems that only a few persons are woking in this room quietly. Recommendation: Take this room";
        break;
      }
      case (this.Presence=="detected" && this.Air<=this.limitAirOK && this.Noise<=this.limitNoiseGood):{
        this.bewertung = "Seems that many persons are woking in this room, so the Air is bad. Recommendation: Look for another room";
        break;
      }
      case (this.Presence=="detected" && this.Air>=this.limitAirOK && this.Noise>=this.limitNoiseGood):{
        this.bewertung = "Seems that either many people are working in that room with open window or few people loudly. Recommendation: Give it a try and bring headphones :)";
        break;
      }
      case (this.Presence=="detected" && this.Air>=this.limitAirGood && this.Noise>=this.limitNoiseGood):{
        this.bewertung = "Seems that the persons in this room are woking loud. Recommendation: Look for another room";
        break;
      }

    }
  }

  makeItColorfull(){
    if (this.Air <= this.limitAirOK){
      this.airColor = "Red";
    }else if (this.Air <= this.limitAirGood){
      this.airColor = "Yellow";
    } else  if (this.Air.toString() == "?"){
      this.airColor = "Grey";
    }else {
      this.airColor = "Green";
    }

    if (this.Presence=="detected" ){
      this.presenceColor = "Yellow";
    }else if (this.Presence=="not detected"){
      this.presenceColor = "Green";
    }else {
      this.presenceColor = "Grey";
    }

    let alert8 = this.alertCtrl.create({title: "Comparison", subTitle: " "+this.Noise , buttons:['OK']});
    //alert8.present();
    if (this.Noise <= this.limitNoiseGood){
      this.noiseColor = "Green";
    }else if (this.Noise.toString() >= "?"){
      this.noiseColor = "Grey";
    }else {
      this.noiseColor = "Red";
    }
  }

  showFullImage(img, title){
    this.photoViewer.show(this.file.applicationDirectory + img, title, {share: false});
  }

  showFullRoomImage(){
    let img : String  = "www/assets/imgs/" + this.RoomID + "Raumplan.jpg";
    let title : String = this.RoomID;
    this.photoViewer.show(this.file.applicationDirectory + img, title.toString(), {share: false});
  }

  showSensorPage(){
    this.navCtrl.push(SensorHelpPage);
  }
}
