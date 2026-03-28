import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { TimeAgoPipe } from '../../../pipes/time-ago-pipe';
import { PrivacyPipe } from '../../../pipes/privacy-pipe';

import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';
import { CommentViewComponent } from "./comment/comment-view/comment-view.component";
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';






@Component({
  selector: 'app-post-ui',
  imports: [TimeAgoPipe, PrivacyPipe, RouterLink, ReactiveFormsModule, CommentViewComponent],
  templateUrl: './post-ui.component.html',
  styleUrl: './post-ui.component.css',
})
export class PostUiComponent {
  private readonly authService=inject(AuthService)
  private readonly postService=inject(PostsService)
  // Inputs
  @Input() post!: Post;

  // Outputs
  @Output() privacyChange = new EventEmitter<{ post: Post; privacy: string }>();
  @Output() like = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<string>();
  @Output() updated = new EventEmitter<void>();
  @Output() savePost = new EventEmitter<void>();

  // State
  userId = ''

  //flags
  flag:boolean=false
  editState:boolean=false;

  //formcontrols
  editSharedBody=new FormControl('')

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId()
    initFlowbite()
  }

  updatePrivacy(privacy: string): void {
    this.privacyChange.emit({
      post: this.post,
      privacy:privacy
    });
  }
  ss(){
    console.log('ss')
    return this.savePost.emit()
  }

  likePost(): void {
    this.like.emit(this.post);
  }

  deletePost(): void {
    this.delete.emit(this.post._id);
  }
  showComment(){
    this.flag=!this.flag
    
  }
  sharePost(postId:string):void{
    this.postService.sharePost(postId,`${this.post.user.name} has shared `).subscribe({
      next:res=>{
        console.log(res)
      },
      error:err=>console.log(err)
    })
  }

  fun(){
    console.log('hello world')
    this.editState=true;
    this.editSharedBody.setValue(this.post.body)
  }
  cancel(){
    console.log('hello world')
    this.editState=false;
  } 
  update(){
    console.log('hello')
    const formData=new FormData()
    if(this.editSharedBody.value){
      formData.append('body',this.editSharedBody.value)
    }
    this.postService.updatePost(formData,this.post._id).subscribe({
      next:res=>{
        this.editState=false;
        this.updated.emit()
      },
      error:err=>console.log(err)
    })
  }
}

