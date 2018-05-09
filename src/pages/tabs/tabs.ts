import { Component } from '@angular/core';

import { SensorDataPage } from '../sensor/sensor';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SensorDataPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
