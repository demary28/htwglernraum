import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsDarkProvider } from './../providers/settingdark/settingdark';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  selectedTheme:String;
  private screenOrientation: ScreenOrientation; 


  constructor(
        platform: Platform, 
        statusBar: StatusBar, 
        splashScreen: SplashScreen, 
        private settings: SettingsDarkProvider, 
        private screenOrientation: ScreenOrientation  
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
      statusBar.styleBlackTranslucent();
      this.checkOrientationLock();
      splashScreen.hide();
    });
  }
  
 checkOrientationLock(){
 this.nativeStorage.getItem('SettingOrientationLock')
    .then(
        data => {if(data.lock == "true"){this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);}},
        error => {console.log('no AutoLoad Setting saved');},
      );
  }


}
