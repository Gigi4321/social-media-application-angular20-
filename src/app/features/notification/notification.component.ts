import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from './notification.interface';
import { TypeFormatePipe } from '../../shared/pipes/type-formate-pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { RouterLink } from "@angular/router";
import { TransformPipe } from '../../shared/pipes/transform-pipe';

@Component({
  selector: 'app-notification',
  imports: [TypeFormatePipe, TimeAgoPipe, RouterLink,TransformPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {

  private readonly notificationService = inject(NotificationService)
  allNotification?: Notification[]
  UnReadNotification?: Notification[];
  unReadNotifiactionCount: number = 0;
  notifiactionId = '';
  currentTab = 'all';
  changeCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  currentPage: number = 1;
  

  

  loadMore(){
    this.currentPage++;
    
    this.getNotfication();
  }

  ngOnInit() {
    this.getNotfication()
  }
  getNotfication() {
    this.notificationService.getAllNotification(this.currentPage).subscribe({
      next: res => {
        console.log(res)
        if(this.allNotification && this.allNotification.length >0){
          this.allNotification = [...this.allNotification,...res.data.notifications]
        }
        else{
          this.allNotification=[...res.data.notifications]
        }
        this.getUnReadNotificationCount();
        this.UnReadNotification = this.allNotification?.filter(n => !n.isRead)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getUnReadNotificationCount() {
    this.notificationService.getUnReadNotifiactionCount().subscribe({
      next: res => {
        console.log(res)
        this.unReadNotifiactionCount = res.data.unreadCount;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  makeNotificationAsRead(id: string) {
    this.notificationService.makeNotificationAsRead(id).subscribe({
      next: res => {
        console.log(id)
        console.log(res)
        this.getNotfication()
        this.getUnReadNotificationCount()
      },
      error: err => {
        console.log("id is ", id)
        console.log(err)
      }
    })
  }
  makeAllAsRead() {
    return this.notificationService.makeAllAsRead().subscribe({
      next: res => {
        console.log(res)
        this.getNotfication();
      },
      error: err => {
        console.log(err)
      }
    })
  }


  getNotificationIcon(type: string) {
    switch (type) {
      case 'like_post':
        return 'fa-heart'
      case 'comment_post':
        return 'fa-comment'
      case 'follow':
        return 'fa-user-plus'
      case 'share_post':
        return 'fa-share'
      default:
        return 'fa-bell'
    }
  }



}
