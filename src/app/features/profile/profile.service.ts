import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  header: object = {
    headers: {
      'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
    }
  }
  private readonly httpClient = inject(HttpClient)
  getProfile(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/profile-data`, this.header)

  }
  getUserPosts(id:string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/${id}/posts`,this.header)
  }

}
