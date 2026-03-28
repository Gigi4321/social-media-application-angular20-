import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  private readonly httpclient = inject(HttpClient)
  getSuggestUsers(limit: number): Observable<any> {
    return this.httpclient.get(`https://route-posts.routemisr.com/users/suggestions?limit=${limit}`, this.header)
  }
  
  header: object = {
    headers: {
      'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
    }
  }
  follow_unfollow(userId:string): Observable<any> {
    return this.httpclient.put(`https://route-posts.routemisr.com/users/${userId}/follow`, {},this.header)
  }
}
