import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient=inject(HttpClient)
    header: object = {

    headers: {
      'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
    }
  }

  getAllNotification(currentPage:number):Observable<any>{
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications?page=${currentPage}&limit=10`,this.header)
  }
  getUnReadNotifiactionCount():Observable<any>{
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications/unread-count`,this.header)
  }
  makeNotificationAsRead(id:string):Observable<any>{
    return this.httpClient.patch(`https://route-posts.routemisr.com/notifications/${id}/read`,{},this.header)
  }
  makeAllAsRead():Observable<any>{
    return this.httpClient.patch(`https://route-posts.routemisr.com/notifications/read-all`,{},this.header)
  }
}
