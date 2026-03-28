import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

   transform(isRead: boolean): string {
    return isRead ? 'Readed' : 'Mark as read';
  }

}
