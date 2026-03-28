import {  Component,  inject } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { initFlowbite } from 'flowbite';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from "@angular/router";

import { PrivacyPipe } from '../../../../shared/pipes/privacy-pipe';
import { ActiveLinkService } from '../../../../core/services/active-link.service';
import { ProfileService } from '../../../profile/profile.service';
import { PostUiComponent } from "../../../../shared/ui/components/post-ui/post-ui.component";
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-feed-content',
  imports: [ ReactiveFormsModule,  PrivacyPipe, PostUiComponent],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent  {
  

  audience = 'public';

  feedPosts?: Post[];
  fileReader = new FileReader()

  myPosts?: Post[];
  postImgUrl: any;
  postList: Post[] = []
  postSaved: Post[] = []
  private readonly postsService = inject(PostsService)
  private readonly activeLinkService = inject(ActiveLinkService)
  private readonly authService = inject(AuthService)
  private readonly profileService = inject(ProfileService)

  currentTab = this.activeLinkService.activeTab
  userId = ''
  currentUser:any;
  saveFile!: File;

 count:number=10;
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user')!)?._id;
    this.getAllPostsData()
    this.getMyPosts()
    this.getFeedPosts();
    this.getSavePosts();
    initFlowbite()
    this.count=10;
    this.currentUser=this.authService.getCurrentUser()
  }


  getMyPosts() {
    this.profileService.getUserPosts(this.userId).subscribe({
      next: res => {
        console.log(res)
        this.myPosts = res.data.posts
        console.log(this.myPosts)
      },
      error: err => {
        console.log('error in get user posts feed content compo', err)
      }
    })
  }
 

  getFeedPosts() {
    console.log('feeeeeeeeeed')
    this.count+=5;
    this.postsService.getFeedPosts('following',this.count)
      .subscribe({
        next: res => {
          console.log("feed", res);
          this.feedPosts = res.data.posts;
     
        },
        error: err => console.error(err)
      });
  }




  getAllPostsData() {
   
    this.postsService.getAllPosts().subscribe({
      next: res => {

        this.postList = res.data.posts;


      },
      error: err => {

      }
    })
  }
  makePostSaved(post:Post) {
   
    this.postsService.makePostSaved(post._id).subscribe({
      next:res=>{console.log(res)
        this.getFeedPosts()
        this.getAllPostsData()
        this.getMyPosts()
        this.getSavePosts()
      },
      error:err=>console.log(err)
    })
  }

  getSavePosts() {
    this.postsService.getSavePosts(this.userId).subscribe({
      next: res => {
        this.postSaved = res.data.bookmarks   
      },
      error: err => {
        console.log(err)
      }
    })
  }

  setPrivacy(p: string) {
    this.audience = p;
  }
  content: FormControl = new FormControl("")
  privacy_status: FormControl = new FormControl("");

  selectImg(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {

      this.saveFile = files[0]

      //show file in html
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveFile)
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.postImgUrl = e.target?.result
      }
    }
  }






  submitForm(e: Event, f: HTMLFormElement) {
    e.preventDefault();


    const formData = new FormData()

    if (this.content.value) {
      formData.append('body', this.content.value)
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile)
    }
    if (this.audience) {

      formData.append('privacy', this.audience)
    }
    this.postsService.createNewPost(formData).subscribe({
      next: res => {
        console.log(res)
        if (res.success) {
          this.getAllPostsData()
          f.reset()
        }
      }
      ,
      error: err => {

      }
    })


  }

  updatePrivacy({post, privacy}:{post:Post,privacy:string}): void {
    console.log(privacy)
    const formdata = new FormData();
    // 
    if (privacy) {
      formdata.append('privacy', privacy);
    }

    this.postsService.updatePost(formdata, post._id).subscribe({
      next: res => {
        console.log("success updateing",res)
        post.privacy = privacy;
      },
      error: err => {
        console.log(err)
      }
    })



  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe({
      next: res => {
        console.log(res)
        this.getFeedPosts()
        this.getAllPostsData()
        this.getMyPosts()
        this.getSavePosts()
      },
      error: err => {
        console.log(err)
      }
    })
  }



  likePost(post: Post) {
    console.log(post)

    this.postsService.likePost(post._id).subscribe({
      next: res => {
        console.log(res)
        post.likesCount = res.data.post.likesCount
        post.likes = res.data.post.likes
      }
      ,
      error: err => {
        console.log(err)
      }
    })
  }

}
