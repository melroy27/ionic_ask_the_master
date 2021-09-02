import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeOf'
})
export class TypeOfPipe implements PipeTransform {

  transform(value: any): any {
    // console.log("Pipe works ", typeof value);
    return typeof value;
  }

}
