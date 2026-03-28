import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateData'
})
export class FormateDataPipe implements PipeTransform {

transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
  }

}
