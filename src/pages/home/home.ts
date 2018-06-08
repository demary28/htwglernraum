import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController, FabContainer  } from 'ionic-angular';
import { SensorDataPage } from '../sensor/sensor';
import { SettingsPage } from '../settings/settings';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { SettingsDarkProvider } from '../../providers/settingdark/settingdark';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  O205Color: String = "Grey";
  O205Presence: String = "?";
  O205Air: String = "?";
  O205Noise: String;
  O205visible: Boolean = true;

   O206Color: String = "Grey";
   O206Presence: String = "?";
   O206Air: String = "?";
   O206Noise: String = "?";
   O206visible: Boolean = true;

   O001Color: String = "Grey";
   O001Presence: String = "?";
   O001Air: String = "?";
   O001Noise: String = "?";
   O001visible: Boolean = true;

   O101Color: String = "Grey";
   O101visible: Boolean = true;

   O108Color: String = "Grey";
   O108visible: Boolean = true;


   Aktualisiert: Boolean = false;
   AutoLoadActivatet: Boolean;
   FilterRed: Boolean = false;
   FilterYellow: Boolean = false;
   FilterGreen: Boolean = false;

   selectedTheme: String;

  

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public events: Events, 
    public loadingCtrl: LoadingController, 
    private nativeStorage: NativeStorage, 
    private http: HTTP, 
    private settings: SettingsDarkProvider, 
    private screenOrientation: ScreenOrientation 
    ) {
    this.checkAutoLoad();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.checkOrientationLock();

  }

  checkAutoLoad(){
    this.nativeStorage.getItem('SettingAutoLoad')
      .then(
        data => {if (data.autoLoad == "true"){this.updateCards();}},
        error => {console.error('no autoLoadSettings')}
      );
  }

  checkOrientationLock(){
    this.nativeStorage.getItem('SettingOrientationLock')
      .then(
        data => {if(data.lock == "true"){this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);}},
        error => {console.log('no AutoLoad Setting saved');},
      );
  }

  doRefresh(refresher) {
    this.updateCards();
    refresher.complete();
    this.Aktualisiert = true;
  }




  showRoomInfo(id:String){
    if (this.Aktualisiert==true){
      if (id == "O205"){
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O205Presence, Air: this.O205Air, Noise: this.O205Noise, Actu:true});      
      }
      if (id == "O206"){
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O206Presence, Air: this.O206Air, Noise: this.O206Noise, Actu:true});
      }
      if (id == "O001"){
        //this.events.publish('setRoomID', id, this.O208Presence, this.O208Air, this.O208Noise);
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O001Presence, Air: this.O001Air, Noise: this.O001Noise, Actu:true});

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
    
    this.O205Color = "Red";
    this.O205Presence = "detected";
    this.O205Air = "1834";
    this.O205Noise = "89";

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

        if(this.O205Color!=category){
          this.O205visible = false;
        }
        if(this.O206Color!=category){
          this.O206visible = false;
        }
        if(this.O001Color!=category){
          this.O001visible = false;
        }
        if(this.O101Color!=category){
          this.O101visible = false;
        }
        if(this.O108Color!=category){
          this.O108visible = false;
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
    this.O205visible = true;
    this.O206visible = true;
    this.O001visible = true;
    this.O101visible = true;
    this.O108visible = true;

  }

}