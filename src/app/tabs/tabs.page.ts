import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { TabSwapService } from '../tab-swap.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
@ViewChild('tabs', { static: false }) tabs!: IonTabs;
  constructor(private route: ActivatedRoute, private tabswap: TabSwapService) {}
  
  setCurrentTab() {
    var selectedTab = this.tabs.getSelected();
    console.log(selectedTab);
    if(selectedTab == "tab1")
    {
      
    }
    else if (selectedTab == "tab2")
    {
      
    }
  }
}
