import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  private get headers() {
    return {
      headers: {
        'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  // Get comments for a post
  getPostComment(postId: string, page: number = 1, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments?page=${page}&limit=${limit}`,
      this.headers
    );
  }

  // Create a comment
  createComment(postId: string, data: FormData): Observable<any> {
    return this.httpClient.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      data,
      this.headers
    );
  }

  // Update comment
  updateComment(postId: string, commentId: string, data: FormData): Observable<any> {
    return this.httpClient.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      data,
      this.headers
    );
  }

  // Delete comment or reply
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      this.headers
    );
  }

  // Like/Unlike comment
  likeComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,
      {},
      this.headers
    );
  }

  // Get replies for a comment
  getCommentReplies(postId: string, commentId: string, pageNumber: number = 1, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=${pageNumber}&limit=${limit}`,
      this.headers
    );
  }

  // Create a reply
  createReply(postId: string, commentId: string, data: FormData): Observable<any> {
    return this.httpClient.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,
      data,
      this.headers
    );
  }
}