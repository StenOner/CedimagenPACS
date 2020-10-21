import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateUserState'
})
export class TranslateUserStatePipe implements PipeTransform {

  transform(value:string):string{
    let translated = '';
    if (value=='true'||value=='1') translated = 'Verdadero';
    if (value=='false'||value=='0') translated = 'Falso';
    return translated;
  }

}