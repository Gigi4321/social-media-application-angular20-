import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.interface';
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { PrivacyPipe } from '../../shared/pipes/privacy-pipe';

import { initFlowbite } from 'flowbite';
import { PostUiComponent } from "../../shared/ui/components/post-ui/post-ui.component";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-details',
  imports: [ PostUiComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

 ngAfterViewInit(): void {

    setTimeout(() => {
      initFlowbite(); 
    }, 0);
  }


  post: Post = {} as Post;
  userId = ''
  postId: string = '';
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postsService = inject(PostsService)
  private readonly authService = inject(AuthService)
  ngOnInit() {
    initFlowbite()
    this.userId = this.authService.getCurrentUserId()
    this.activatedRoute.paramMap.subscribe(param => {
      this.postId = param.get('id')!

      this.getPostDetails();
    }
    )
  }
  getPostDetails() {
    this.postsService.getSinglePost(this.postId).subscribe({
      next: res => {
        console.log(res)
        this.post = res.data.post
        console.log(this.post)
      },
      error: err => {
        console.log(err)
      }
    })
  }


  updatePrivacy({ post, privacy }: { post: Post, privacy: string }): void {
    console.log(privacy)
    const formdata = new FormData();
  
    if (privacy) {
      formdata.append('privacy', privacy);
    }

    this.postsService.updatePost(formdata, post._id).subscribe({
      next: res => {
        console.log("success updateing", res)
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
