import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommentUiComponent } from "./comment-ui/comment-ui.component";
import { AddCommentComponent } from "./add-comment/add-comment.component";
import { CommentsService } from '../comments.service';
import { Input } from '@angular/core';
import { Comment } from '../comment.interface';

@Component({
  selector: 'app-comment-view',
  imports: [CommentUiComponent, AddCommentComponent],
  templateUrl: './comment-view.component.html',
  styleUrl: './comment-view.component.css',
})
export class CommentViewComponent {
  private readonly commentsService = inject(CommentsService)
  @Input() postId?: string;
  @Input() commentCount?: number;
  commentId?:string;
 




  formData?:FormData
  
  
  hello(comment: Comment) {
    this.commentId=comment._id;
    this.formData=new FormData()
    console.log(comment.content)
    console.log(comment.image)

    if (comment.content) {
      this.formData.append('content', comment.content)
    }

    if (comment.image) {
      this.formData.append('image', comment.image)
    }
    console.log(this.formData)
   
  }




  comments?: Comment[];
  createComment(formData: FormData) {
    console.log(this.postId)
    if (!this.postId) return;
    this.commentsService.createComment(this.postId, formData).subscribe({
      next: (res) => this.getComments(),
      error: (err) => console.error(err)
    });
  }

  ngOnInit() {
    this.getComments()
  }


  getComments(page = 1, limit = 10) {

    if (!this.postId) return;
    this.commentsService.getPostComment(this.postId, page, limit)
      .subscribe({
        next: (res) => {
          this.comments = res.data.comments
          console.log(res)
        },
        error: (err) => console.error('Error fetching comments', err)
      });
  }


  likeComment(commentId: string) {

    this.commentsService.likeComment(this.postId!, commentId).subscribe({
      next: (res) => {
        console.log(res)
        this.getComments()
      },
      error: (err) => console.error(err)
    });
  }
  deleteComment(commentId: string) {
    console.log("yeeeeeeeeeeeeeeeee")
    this.commentsService.deleteComment(this.postId!, commentId).subscribe({
      next: (res) => {
        console.log(res)
        this.getComments()
      },
      error: (err) => console.error(err)
    });
  }
  updateComment(formData:FormData){
    this.commentsService.updateComment(this.postId!,this.commentId!,formData).subscribe({
       next:res=>{
        console.log(res)
        this.getComments()
       },
       error:err=>{
        console.log(err)
       }
    })
  }

 
}

