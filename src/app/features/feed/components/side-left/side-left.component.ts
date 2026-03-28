import { Component, inject } from '@angular/core';
import { ActiveLinkService } from '../../../../core/services/active-link.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-side-left',
  imports: [],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css',
})
export class SideLeftComponent {


 

  
  private readonly activeLinkService = inject(ActiveLinkService)
  currentTab = this.activeLinkService.activeTab
  ngOnInit() {
    initFlowbite()
    this.currentTab = this.activeLinkService.activeTab;
  }
  
  changeTab(tab: string) {
    this.activeLinkService.setActive(tab)
  }

}
