import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController, FabContainer, DateTime  } from 'ionic-angular';
import { SensorDataPage } from '../sensor/sensor';
import { SettingsPage } from '../settings/settings';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { SettingsDarkProvider } from '../../providers/settingdark/settingdark';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Timestamp } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SensorHelpPage } from "../sensorHelp/SensorHelp";


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

  numberOfRequests: string = "0";

  //Grenzwerte für Einfärbung/Bewertung
  limitNoiseGood:String = "18";
  limitNoiseOK:String = "27";
  limitAirGood:String = "92";
  limitAirOK:String = "85";



  

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
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O205Presence, Air: this.O205Air, Noise: this.O205Noise, Actu:true, limitNoiseGood: this.limitNoiseGood, limitAirGood: this.limitAirGood, limitAirOK: this.limitAirOK});      
      }
      if (id == "O206"){
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O206Presence, Air: this.O206Air, Noise: this.O206Noise, Actu:true, limitNoiseGood: this.limitNoiseGood, limitAirGood: this.limitAirGood, limitAirOK: this.limitAirOK});
      }
      if (id == "O001"){
        //this.events.publish('setRoomID', id, this.O208Presence, this.O208Air, this.O208Noise);
        this.navCtrl.push(SensorDataPage, {id: id, Presence: this.O001Presence, Air: this.O001Air, Noise: this.O001Noise, Actu:true, limitNoiseGood: this.limitNoiseGood, limitAirGood: this.limitAirGood, limitAirOK: this.limitAirOK});

      }
      //this.navCtrl.parent.select(1);      
    }
  }

  updateCards(){
    let loader = this.loadingCtrl.create({
        content: "Updating...", 
        
    });
    loader.present();

    var date =  new Date;
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes()-1;

    this.makeURLrequest(year, month, day, hours, minutes);     
    
    this.showAll();
    this.Aktualisiert = true;
    loader.dismiss();
  }

  makeURLrequest(year, month, day, hours, minutes){

    //Fehlerkorrekturen
    if (parseInt(month) < 10){
      month = "0"+parseInt(month);
    }
    if (parseInt(day) < 10){
      day = "0"+parseInt(day);
    }
    if(parseInt(minutes) == -1){
      hours = parseInt(hours) -1;
      minutes = 59; 
    }
    if (parseInt(hours) < 10){
      hours = "0"+parseInt(hours);
    }
    if (parseInt(minutes) < 10){
      minutes = "0"+parseInt(minutes);
    }
    

    //let alert8 = this.alertCtrl.create({title: "HTTP", subTitle: "Request send: "+ year + "/" + month + "/" + day +"/" + hours + "/" + minutes , buttons:['OK']});
    //alert8.present();
    
    var url = "https://htwgmariusstorage01.blob.core.windows.net/htwgstoragecontainer/RaspberryHTWG/00/" + year + "/" + month + "/" + day +"/" + hours + "/" + minutes

    this.http.get(url,{},{})
        .then(
          response => {

           

            var str = response.data
            let alert = this.alertCtrl.create({title: "HTTP", subTitle: ""+str, buttons:['OK']});
              //alert.present();
              console.log('data received')

              //Filter R1 Daten
              var indexR1 = str.indexOf("\"R1 \",");
              //Finde raus, ob R1 überhaupt dabei ist
              if (indexR1 >= 5){
                var info = str.substring(indexR1);
                var indexR1_2 = info.indexOf("}");
                var r1Data = info.substring(0, indexR1_2);

                //Weise R1 -> O 205 zu
                var separator = r1Data.indexOf(": ");
                var restStr = r1Data.substring(separator+2);
                separator = restStr.indexOf(",");
                this.O205Noise = restStr.substring(0, separator);

                separator = restStr.indexOf(": ");
                restStr = restStr.substring(separator+2);
                separator = restStr.indexOf(",");
                this.O205Air = restStr.substring(0, separator);

                separator = restStr.indexOf(": ");
                if (restStr.substring(separator+2).toString() == "True"){
                  this.O205Presence = "detected";
                } else {
                  this.O205Presence = "not detected";
                }
                this.makeItColorfull("O205");
              }
              
              //Filter R2 Daten
              var indexR2 = str.indexOf("\"R2 \",");
              //Finde raus, ob R2 überhaupt dabei ist
              if (indexR2 >= 5){
                var info2 = str.substring(indexR2);
                var indexR2_2 = info2.indexOf("}");
                var r2Data = info2.substring(0, indexR2_2);

                //Weise R2 -> O206 zu
                separator = r2Data.indexOf(": ");
                restStr = r2Data.substring(separator+2);
                separator = restStr.indexOf(",");
                this.O206Noise = restStr.substring(0, separator);

                separator = restStr.indexOf(": ");
                restStr = restStr.substring(separator+2);
                separator = restStr.indexOf(",");
                this.O206Air = restStr.substring(0, separator);

                separator = restStr.indexOf(": ");
                separator = restStr.indexOf(": ");
                if (restStr.substring(separator+2).toString() == "True"){
                  this.O206Presence = "detected";
                } else {
                  this.O206Presence = "not detected";
                }            
                this.makeItColorfull("O206");
        
              } 
              
              this.numberOfRequests = "0" ;

            },
          error => {
            if(error.status == 404){
              this.numberOfRequests = (parseInt(this.numberOfRequests) + 1).toString() ;
              if (parseInt(this.numberOfRequests) >= 6){
                let alertNoBackend = this.alertCtrl.create({title: "System Failure", subTitle: "Seems there is no data of the last 5 minutes. Please try again later", buttons:['OK']});
                alertNoBackend.present();
              }else 
              this.makeURLrequest(year, month, day, hours, parseInt(minutes)-1);
            } else{
            let alert = this.alertCtrl.create({title: "HTTP Error", subTitle: "There could be a problem with your internet connection. "+JSON.stringify(error), buttons:['OK']});
              alert.present();console.log('error loading data')}
            }
        );

  }

  fabController(actionString: string, fab: FabContainer){
    
    if (actionString == "update"){
      this.updateCards();
      this.Aktualisiert = true;
    }
    if(actionString == "settings"){
      this.navCtrl.push(SettingsPage);
    }
    if(actionString == "sensorHelp"){
      this.navCtrl.push(SensorHelpPage);
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

makeItColorfull(RoomName){

  if (RoomName == "O205"){

      switch (true){
        case (this.O205Presence=="not detected" && parseInt(this.O205Air.toString())>=parseInt(this.limitAirGood.toString()) && parseInt(this.O205Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O205Color = "Green";
          break;
        }
        case (this.O205Presence=="not detected" && parseInt(this.O205Air.toString())>=parseInt(this.limitAirOK.toString()) && parseInt(this.O205Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
        this.O205Color = "Yellow";
        break;
        }
        case (this.O205Presence=="detected" && parseInt(this.O205Air.toString())>=parseInt(this.limitAirOK.toString()) && parseInt(this.O205Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O205Color = "Yellow";
          break;
        }
        case (this.O205Presence=="detected" && parseInt(this.O205Air.toString())<=parseInt(this.limitAirOK.toString()) && parseInt(this.O205Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O205Color = "Red";
          break;
        }
        case (this.O205Presence=="detected" && parseInt(this.O205Air.toString())>=parseInt(this.limitAirGood.toString()) && parseInt(this.O205Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
          this.O205Color = "Yellow";
          break;
        }
        case (this.O205Presence=="detected" && parseInt(this.O205Air.toString())<=parseInt(this.limitAirOK.toString()) && parseInt(this.O205Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
          this.O205Color = "Red";
          break;
        }
        default:{
          this.O205Color = "Yellow";
        }
      }
    }else if (RoomName == "O206"){
      switch (true){
        case (this.O206Presence=="not detected" && parseInt(this.O206Air.toString())>=parseInt(this.limitAirGood.toString()) && parseInt(this.O206Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O206Color = "Green";
          break;
        }
        case (this.O206Presence=="not detected" && parseInt(this.O206Air.toString())>=parseInt(this.limitAirOK.toString()) && parseInt(this.O206Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
        this.O206Color = "Yellow";
        break;
        }
        case (this.O206Presence=="detected" && parseInt(this.O206Air.toString())>=parseInt(this.limitAirOK.toString()) && parseInt(this.O206Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O206Color = "Yellow";
          break;
        }
        case (this.O206Presence=="detected" && parseInt(this.O206Air.toString())<=parseInt(this.limitAirOK.toString()) && parseInt(this.O206Noise.toString())<=parseInt(this.limitNoiseGood.toString())):{
          this.O206Color = "Red";
          break;
        }
        case (this.O206Presence=="detected" && parseInt(this.O206Air.toString())>=parseInt(this.limitAirGood.toString()) && parseInt(this.O206Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
          this.O206Color = "Yellow";
          break;
        }
        case (this.O206Presence=="detected" && parseInt(this.O206Air.toString())<=parseInt(this.limitAirOK.toString()) && parseInt(this.O206Noise.toString())>=parseInt(this.limitNoiseGood.toString())):{
          this.O206Color = "Red";
          break;
        }
        default:{
          this.O206Color = "Yellow";
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
