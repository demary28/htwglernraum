import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { NativeStorage } from '@ionic-native/native-storage';
 
@Injectable()
export class SettingsDarkProvider {
 
    private theme: BehaviorSubject<String>;
 
    constructor(private nativeStorage: NativeStorage,) {
        this.theme = new BehaviorSubject('light-theme');
        this.checkDarkTheme();
    }
 
    setActiveTheme(val) {
        this.theme.next(val);
    }

    checkDarkTheme(){
      this.nativeStorage.getItem('SettingThemes')
        .then(
          data => {if(data.darkTheme == "true"){this.setActiveTheme('dark-theme');}},
          error => {console.log('no darkTheme Setting saved');},
        );
    }
 
    getActiveTheme() {
        return this.theme.asObservable();
    }
}