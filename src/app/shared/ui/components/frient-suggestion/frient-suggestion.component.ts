import {Input,  Component, Output, EventEmitter, inject } from '@angular/core';
import { FrientSuggestion } from './frient-suggestion.interface';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-frient-suggestion',
  imports: [],
  templateUrl: './frient-suggestion.component.html',
  styleUrl: './frient-suggestion.component.css',
})
export class FrientSuggestionComponent {
  private readonly auth=inject(AuthService)
   @Input() frient!:FrientSuggestion;
   @Output() follow=new EventEmitter<string>();

   followFriend(){
    this.follow.emit(this.frient._id)
   }

   userId='';
   ngOnInit(){
    this.userId=this.auth.getCurrentUserId()
    console.log(this.frient._id)
   }

}
