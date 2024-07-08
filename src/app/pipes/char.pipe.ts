import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'char',
  standalone: true
})
export class CharPipe implements PipeTransform {
  transform(value: number): string {
    return String.fromCharCode(value);
  }
}
