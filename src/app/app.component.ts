import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  selectedTheme:String;

  constructor(private nativeStorage: NativeStorage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //this.checkDarkTheme();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
    });
  }

  checkDarkTheme(){
    this.nativeStorage.getItem('SettingThemes')
      .then(
        data => {if(data.darkTheme == "true"){this.selectedTheme = "dark-theme";}else {this.selectedTheme = "default-theme";}},
        error => {console.log('no darkTheme Setting saved');},
      );
  }
}
