import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient =inject(HttpClient)
  private readonly router=inject(Router)

  getCurrentUserId():string{
    return JSON.parse(localStorage.getItem('user')!)._id;
  }
  getCurrentUser():string{
    return JSON.parse(localStorage.getItem('user')!);
  }
  signUp(data:object):Observable<any>{
     return this.httpClient.post('https://route-posts.routemisr.com/users/signup',data)
  }
  signIn(data:object):Observable<any>{
    return this.httpClient.post('https://route-posts.routemisr.com/users/signin',data)
  }
  signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }
   changePassword(data: { password: string; newPassword: string }) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      data,
      { headers }
    );
  }

 
}

