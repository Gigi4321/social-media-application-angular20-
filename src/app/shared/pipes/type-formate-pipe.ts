import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFormate'
})
export class TypeFormatePipe implements PipeTransform {

  
  transform(value: string): string {

    if (!value) return '';

    switch(value){

      case 'share_post':
        return 'Shared your post';

      case 'comment_post':
        return 'Commented on your post';

      case 'like_post':
        return 'Liked your post';

      default:
        return value.replace('_',' ');
    }

  }

}
