import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController  } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

   O206Color: String = "Grey";
   O206Presence: String = "?";
   O206Air: String = "?";
   O206Noise: String = "?";
   O206visible: Boolean = true;

   O207Color: String = "Grey";
   O207Presence: String = "?";
   O207Air: String = "?";
   O207Noise: String;
   O207visible: Boolean = true;

   O208Color: String = "Grey";
   O208Presence: String = "?";
   O208Air: String = "?";
   O208Noise: String = "?";
   O208visible: Boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public events: Events, public loadingCtrl: LoadingController) {

  }


  showRoomInfo(id:String){
    if (id == "O206"){
      this.events.publish('setRoomID', id, this.O206Presence, this.O206Air, this.O206Noise);
    }
    if (id == "O207"){
      this.events.publish('setRoomID', id, this.O207Presence, this.O207Air, this.O207Noise);
    }
    if (id == "O208"){
      this.events.publish('setRoomID', id, this.O208Presence, this.O208Air, this.O208Noise);
    }
    
    this.navCtrl.parent.select(1);
  }
  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms){
      end = new Date().getTime();
    }
  }

  updateCards(){
    let loader = this.loadingCtrl.create({
        content: "Updating...", 
        
    });
     loader.present();
    
    this.O206Color = "Red";
    this.O206Presence = "detected";
    this.O206Air = "1834";
    this.O206Noise = "89";
  
    this.O207Color = "Yellow";
    this.O207Presence = "detected";
    this.O207Air = "678";
    this.O207Noise = "65";

    this.O208Color = "Green";
    this.O208Presence = "not detected";
    this.O208Air = "462";
    this.O208Noise = "23";
    
    this.showAll();
    loader.dismiss();
  }

  filter(category:String){
    //let alert = this.alertCtrl.create({title: ""+category, subTitle: "", buttons:['OK']});
    //alert.present();
    this.showAll();

    if(this.O206Color!=category){
      this.O206visible = false;
    }
    if(this.O207Color!=category){
      this.O207visible = false;
    }
    if(this.O208Color!=category){
      this.O208visible = false;
    }
  }

  showAll(){
    this.O206visible = true;
    this.O207visible = true;
    this.O208visible = true;
  }

}
