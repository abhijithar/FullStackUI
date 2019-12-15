import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'sortTask'
})
export class SortTaskPipe implements PipeTransform {

  transform(value: Task[], propertyName: string): Task[] {

    if (propertyName && value)
      return value.sort((a: Task, b: Task) => b[propertyName].localeCompare(a[propertyName]));
    else
      return value;
  }

}
