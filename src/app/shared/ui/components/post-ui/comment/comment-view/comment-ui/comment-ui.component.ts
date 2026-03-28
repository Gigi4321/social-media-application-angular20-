import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Comment } from '../../comment.interface';
import { Input } from '@angular/core';
import { TimeAgoPipe } from '../../../../../../pipes/time-ago-pipe';
import { AuthService } from '../../../../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-comment-ui',
  imports: [TimeAgoPipe],
  templateUrl: './comment-ui.component.html',
  styleUrl: './comment-ui.component.css',
})
export class CommentUiComponent {
  private readonly authService=inject(AuthService)
  @Input() comment?: Comment;
  @Input() comments?: Comment[];
  @Output() likeButtonClicked = new EventEmitter<void>();
  @Output() deleteButtonClicked = new EventEmitter<void>();
  @Output() editButtonClicked = new EventEmitter<void>();


   formData = new FormData();
   showDrop: boolean = false;
  showDropMenu(){
    this.showDrop=!this.showDrop
  }
  userId?:string;
  ngOnInit(){
  this.userId= this.authService.getCurrentUserId()
  }


}
