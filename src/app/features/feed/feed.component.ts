import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SideRightComponent } from './components/side-right/side-right.component';
import { FeedContentComponent } from './components/feed-content/feed-content.component';
import { SideLeftComponent } from "./components/side-left/side-left.component";

@Component({
  selector: 'app-feed',
  imports: [SideRightComponent, SideRightComponent, FeedContentComponent, SideLeftComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {


  
  ngOnInit(){
    initFlowbite()
  }
  getToken():void{
    
    
  }

}
