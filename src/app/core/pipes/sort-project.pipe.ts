import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../models/project';

@Pipe({
  name: 'sortProject'
})
export class SortProjectPipe implements PipeTransform {

  transform(value: Project[], propertyName: string): Project[] {
    if (propertyName && value)
      return value.sort((a: Project, b: Project) => b[propertyName].toString().localeCompare(a[propertyName]));
    else
      return value;
  }

}
