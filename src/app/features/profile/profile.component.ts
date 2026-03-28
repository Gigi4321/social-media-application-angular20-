import { Component, inject } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { ProfileService } from './profile.service';
import { Profile } from './profile.interface';
import { Post } from '../../core/models/post.interface';
import { FormateDataPipe } from '../../shared/pipes/formate-data-pipe';


@Component({
  selector: 'app-profile',
  imports: [FormateDataPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userPosts?:Post[];
  UserProile?:Profile;
  userId:string=''
  savePosts?:Post[];
  choosePosts:string='userPosts'
  ngOnInit(){
    this.getUserProfile();
    this.userId=JSON.parse(localStorage.getItem('user')!)._id;
    this.getPosts()
    this.getPostSaved()

  }
  private readonly profileService=inject(ProfileService)
  private readonly postsService=inject(PostsService);

  getPostSaved(){
    this.postsService.getSavePosts(this.userId).subscribe({
      next:res=>{
        console.log("save posts ; ",res)
        this.savePosts=res.data.bookmarks;
      },
      error:err=>{
        console.log(err)
      }
    })
  }


  getUserProfile(){
    this.profileService.getProfile().subscribe({
      next:res=>{
        this.UserProile = res.data.user;
        console.log("userProfile.bookmarks : ",res.data.user.bookmarks)
      },
      error:err=>{
        console.log('proile compo get user posts err ',err)
      }
    })
  }

  getPosts(){
    this.profileService.getUserPosts(this.userId).subscribe({
      next:res=>{
        this.userPosts=res.data.posts
      },
      error:err=>{
        console.log(err)
      }
    })
  }
  
  showPosts(switchPost:string){
    this.choosePosts=switchPost;
  }
}
