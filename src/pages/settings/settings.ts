import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController, ToastController } from 'ionic-angular';
import { SettingsDarkProvider } from '../../providers/settingdark/settingdark';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

    public autoLoad: Boolean;
    public darkTheme: Boolean;
    selectedTheme : String;

constructor(private nativeStorage: NativeStorage, 
    private alertCtrl: AlertController, 
    private toastCtrl:ToastController, 
    private settings: SettingsDarkProvider
    ) {
    this.checkAutoLoad();
    this.checkDarkTheme();
}

checkAutoLoad(){
    this.nativeStorage.getItem('SettingAutoLoad')
      .then(
        data => {if(data.autoLoad == "true"){this.autoLoad = true;}else {this.autoLoad = false;}},
        error => {console.log('no AutoLoad Setting saved');},
      );
  }

checkDarkTheme(){
    this.nativeStorage.getItem('SettingThemes')
      .then(
        data => {if(data.darkTheme == "true"){this.darkTheme = true; this.selectedTheme = 'dark-theme';}else {this.darkTheme = false; this.selectedTheme = 'light-theme';}},
        error => {console.log('no darkTheme Setting saved');},
      );
  }


changeAutoLoad(status:boolean){
   if (status == false){
        this.nativeStorage.setItem('SettingAutoLoad', {autoLoad: 'false'})
        .catch(error => {let alert = this.alertCtrl.create({title: ""+error, subTitle: "", buttons:['OK']});
                            alert.present();console.error('Error storing Settings')});
        this.showRestartToast();
    } else {
        this.nativeStorage.setItem('SettingAutoLoad', {autoLoad: 'true'})
        .catch(error => {let alert = this.alertCtrl.create({title: ""+error, subTitle: "", buttons:['OK']});
                            alert.present();console.error('Error storing Settings')});
        this.showRestartToast(); 
    }
}

darkThemeActivater(status:boolean){
    if (status == false){
        this.settings.setActiveTheme('light-theme');
        this.nativeStorage.setItem('SettingThemes', {darkTheme: 'false'})
        .catch(error => {let alert = this.alertCtrl.create({title: ""+error, subTitle: "", buttons:['OK']});
                            alert.present();console.error('Error storing Settings')});
    } else {
        this.settings.setActiveTheme('dark-theme');
        this.nativeStorage.setItem('SettingThemes', {darkTheme: 'true'})
        .catch(error => {let alert = this.alertCtrl.create({title: ""+error, subTitle: "", buttons:['OK']});
                            alert.present();console.error('Error storing Settings')});
    }
    if (this.selectedTheme === 'dark-theme') {
        
      } else {
        
      }
}

showRestartToast(){
    let toast = this.toastCtrl.create({message: 'Changes are affective after restart', duration: 3000, position: "bottom"});
    toast.present(); 
}

}