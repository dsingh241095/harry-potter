import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value?: string): string {
    if(value)
      return '$' +value+ ' million';
    else 
      return '';
  }

}
