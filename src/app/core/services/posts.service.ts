import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpClient = inject(HttpClient)



  getAllPosts(): Observable<any> {
    return this.httpClient.get('https://route-posts.routemisr.com/posts', {
      headers: {
        'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  createNewPost(data: object): Observable<any> {
    return this.httpClient.post('https://route-posts.routemisr.com/posts', data, this.header)
  }
  updatePost(data: object, id: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${id}`, data, this.header)
  }

  // private readonly httpClient = inject(HttpClient)
  header: object = {

    headers: {
      'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
    }
  }


  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/posts/${postId}`, this.header)
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`https://route-posts.routemisr.com/posts/${postId}`, this.header)
  }

  likePost(id: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${id}/like`, {}, this.header)
  }





  getFeedPosts(only: string, limit: number ): Observable<any> {

    return this.httpClient.get(`https://route-posts.routemisr.com/posts/feed?only=${only}&limit=${limit}`, this.header);
  }


  getSavePosts(id: string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/bookmarks`, this.header)
  }
  makePostSaved(postId:string):Observable<any>{
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${postId}/bookmark`,{},this.header)
  }

  sharePost(postId:string,bodyText:string):Observable<any>{
    const body = { body: bodyText };
      return this.httpClient.post(`https://route-posts.routemisr.com/posts/${postId}/share`,body,this.header)
  }
  
}
