import { Component } from '@angular/core';

import { SensorDataPage } from '../sensor/sensor';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsDarkProvider } from '../../providers/settingdark/settingdark';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = ContactPage;
  selectedTheme: String;

  constructor( private settings: SettingsDarkProvider ) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
}
