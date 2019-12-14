import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'sortUser'
})
export class SortUserPipe implements PipeTransform {

  transform(value: User[], propertyName: string): User[] {
    if (propertyName)
      return value.sort((a: User, b: User) => b[propertyName].localeCompare(a[propertyName]));
    else
      return value;
  }

}
