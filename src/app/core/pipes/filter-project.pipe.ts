import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(projects: Project[], searchText: string): Project[] {

    if (!projects || !searchText) return projects;

    return projects.filter(project => {
      return project.project.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });

  }
  
}
