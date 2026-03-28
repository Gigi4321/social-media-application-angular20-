import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ActiveLinkService {
 activeTab = signal('feed');

  setActive(tab: string) {

    this.activeTab.set(tab);
  }

}
