import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe',
  standalone: true
})
export class DurationPipePipe implements PipeTransform {

  transform(value?: string): string {
    if(value){
       const duration = Math.floor(parseInt(value)/60) + 'h ' + parseInt(value)%60 + ' min'
       return duration;
    } else {
       return '';
    }
  }
}
