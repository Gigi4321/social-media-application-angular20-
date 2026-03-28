import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getCurrentUser(){
    const user=localStorage.getItem('user');
    return user?JSON.parse(user):null;
  }
  SetCurrentUser(user:object){
    localStorage.setItem('user',JSON.stringify(user))
  }
}
