import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'privacy'
})
export class PrivacyPipe implements PipeTransform {

   transform(value: string): string {

    if(value === 'following'){
      return 'Followers';
    }

    if(value === 'only_me'){
      return 'Only Me';
    }

    if(value === 'public'){
      return 'Public';
    }

    return value;
  }

}
