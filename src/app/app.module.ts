import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SensorDataPage } from '../pages/sensor/sensor';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { SensorHelpPage } from "../pages/sensorHelp/SensorHelp";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { SettingsDarkProvider } from '../providers/settingdark/settingdark';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    SensorDataPage,
    ContactPage,
    HomePage,
    SettingsPage,
    TabsPage, 
    SensorHelpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SensorDataPage,
    ContactPage,
    HomePage,
    SettingsPage,
    TabsPage, 
    SensorHelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    NativeStorage,   
    File,
    HTTP,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsDarkProvider
  ]
})
export class AppModule {}
