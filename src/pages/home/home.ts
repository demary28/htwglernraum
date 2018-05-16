import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController, FabContainer  } from 'ionic-angular';
import { SensorDataPage } from '../sensor/sensor';
import { SettingsPage } from '../settings/settings';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';


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

   Aktualisiert: Boolean = false;
   AutoLoadActivatet: Boolean;
   FilterRed: Boolean = false;
   FilterYellow: Boolean = false;
   FilterGreen: Boolean = false;

  

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public events: Events, 
    public loadingCtrl: LoadingController, 
    private nativeStorage: NativeStorage, 
    private http: HTTP
  ) {
    this.checkAutoLoad();
  }

  checkAutoLoad(){
    this.nativeStorage.getItem('SettingAutoLoad')
      .then(
        data => {if (data.autoLoad == "true"){this.updateCards();}},
        error => {console.error('no autoLoadSettings')}
      );
  }

  doRefresh(refresher) {
    this.updateCards();
    refresher.complete();
    this.Aktualisiert = true;
  }


  showRoomInfo(id:String){
    if (this.Aktualisiert==true){
      if (id == "O206"){
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O206Presence, Air: this.O206Air, Noise: this.O206Noise, Actu:true});      
      }
      if (id == "O207"){
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O207Presence, Air: this.O207Air, Noise: this.O207Noise, Actu:true});
      }
      if (id == "O208"){
        //this.events.publish('setRoomID', id, this.O208Presence, this.O208Air, this.O208Noise);
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O208Presence, Air: this.O208Air, Noise: this.O208Noise, Actu:true});

      }
      //this.navCtrl.parent.select(1);      
    }
  }

  updateCards(){
    let loader = this.loadingCtrl.create({
        content: "Updating...", 
        
    });
     loader.present();

     this.http.get('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new',{},{})
        .then(
          data => {let alert = this.alertCtrl.create({title: "HTTP", subTitle: ""+JSON.stringify(data.data), buttons:['OK']});
              //alert.present();
              console.log('data received')},
          error => {let alert = this.alertCtrl.create({title: "HTTP Error", subTitle: "There is a problem with your internet connection. "+JSON.stringify(error), buttons:['OK']});
              alert.present();console.log('error loading data')}
        );
    
    this.O207Color = "Red";
    this.O207Presence = "detected";
    this.O207Air = "1834";
    this.O207Noise = "89";
  
    this.O208Color = "Yellow";
    this.O208Presence = "detected";
    this.O208Air = "678";
    this.O208Noise = "65";

    this.O206Color = "Green";
    this.O206Presence = "not detected";
    this.O206Air = "462";
    this.O206Noise = "23";
    
    this.showAll();
    this.Aktualisiert = true;
    loader.dismiss();
  }

  fabController(actionString: string, fab: FabContainer){
    
    if (actionString == "update"){
      this.updateCards();
      this.Aktualisiert = true;
    }
    if(actionString == "settings"){
      this.navCtrl.push(SettingsPage);
    }
    fab.close();
  }

  filter(category:String){
    //let alert = this.alertCtrl.create({title: ""+category, subTitle: "", buttons:['OK']});
    //alert.present();
    this.showAll();
    if (this.Aktualisiert==true){
      
      if (this.FilterRed == true && category == "Red"){
        this.FilterRed = false;
      }else if(this.FilterYellow == true && category == "Yellow"){
        this.FilterYellow = false;
      }else if(this.FilterGreen == true  && category == "Green"){
        this.FilterGreen = false;
      }else{

        if(this.O206Color!=category){
          this.O206visible = false;
        }
        if(this.O207Color!=category){
          this.O207visible = false;
        }
        if(this.O208Color!=category){
          this.O208visible = false;
        }

      if (category == "Red"){
        this.FilterRed = true;
      } else if(category == "Yellow"){
        this.FilterYellow = true;
      } else if(category == "Green"){
        this.FilterGreen = true;
      }
      }
    }
  }

  showAll(){
    this.O206visible = true;
    this.O207visible = true;
    this.O208visible = true;
  }

}
