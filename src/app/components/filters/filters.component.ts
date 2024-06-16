import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
@Output() filterTitleString = new EventEmitter<string>();
@Output() releaseYearString = new EventEmitter<string>();
  getTitleFilterString(ev: string){
    this.filterTitleString.emit(ev);
  }

  getReleaseYearFilterString(ev: string){
    this.releaseYearString.emit(ev);
  }
}
