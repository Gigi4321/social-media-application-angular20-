import { Component, inject } from '@angular/core';
import { FrientSuggestionComponent } from "../../../../shared/ui/components/frient-suggestion/frient-suggestion.component";
import { SuggestionsService } from '../../../../core/services/suggestions.service';
import { FrientSuggestion } from '../../../../shared/ui/components/frient-suggestion/frient-suggestion.interface';

@Component({
  selector: 'app-side-right',
  imports: [FrientSuggestionComponent],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent {
  count: number = 10;
  frients?: FrientSuggestion[];
  private readonly suggestionsService = inject(SuggestionsService)
  ngOnInit() {
    this.count = 10;
    this.getSuggestions()
  }
  more() {
    this.count += 10;
    this.getSuggestions()
  }
  getSuggestions() {
    this.suggestionsService.getSuggestUsers(this.count).subscribe({
      next: res => {
        console.log(res)
        this.frients = res.data.suggestions;
      },
      error: err => {
        console.log(err)
      }
    })
  }
  followFriend(friendId:string){
       this.suggestionsService.follow_unfollow(friendId).subscribe({
        next:res=>{
          console.log(res)
        },
        error:err=>{
          console.log(err)
        }
       })
  }

}
