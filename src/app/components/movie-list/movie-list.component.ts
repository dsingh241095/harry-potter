import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription, filter, map } from 'rxjs';
import { movieList } from '../../movie-model/index';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FiltersComponent } from '../filters/filters.component';
import {CurrencyPipe} from '../../pipes/currency.pipe';
import {DurationPipePipe} from '../../pipes/duration-pipe.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FiltersComponent,
    CurrencyPipe,
    DurationPipePipe
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit, OnDestroy {
  public apiSubscription!: Subscription;
  public movieList: movieList[]=[];
  public enteredTitle='';
  public enteredreleaseYear='';
  public filterString='';
  public filteredMovieList: movieList[]=[];
  public titleFilteredMovieList: movieList[]=[];
  public releaseyearFilteredMovieList: movieList[]=[];

  constructor(
    private _dataService: DataService,
  ) {}

  public ngOnInit(): void {
    this.fetchMovieList();
  }

  private fetchMovieList() {
    this.apiSubscription = this._dataService.getmovieList()
      .subscribe({
        next: (record: movieList[]) => {
          this.movieList = record;
          this.filteredMovieList =record;
        },
        error: err => console.error(err),
        complete: () => console.log("Step 1 data loaded...")
      })
  }

  filterTitleStringEvent(ev:string){
    this.enteredTitle = ev; 
    if(this.enteredTitle==='' && this.enteredreleaseYear===''){
      this.filteredMovieList =  this.movieList;
    } else if(this.enteredTitle!=='' && this.enteredreleaseYear===''){
      this.filteredMovieList = this.movieList.filter(x=> x.title.toLocaleLowerCase().indexOf(ev.toLocaleLowerCase()) !==-1);
      this.titleFilteredMovieList = this.filteredMovieList;
    }
    else {
      this.filteredMovieList = this.releaseyearFilteredMovieList.filter(x=> x.title.toLocaleLowerCase().indexOf(ev.toLocaleLowerCase()) !==-1);
      this.titleFilteredMovieList = this.filteredMovieList;
    }
    
  }

  filterReleaseYearEvent(ev:string){
    this.enteredreleaseYear = ev; 
    if(this.enteredreleaseYear==='' && this.enteredTitle==='') {
      this.filteredMovieList =  this.movieList;
    } else if(this.enteredreleaseYear!=='' && this.enteredTitle===''){
      this.filteredMovieList = this.movieList.filter(x=> x.release_date.toLocaleLowerCase().indexOf(ev.toLocaleLowerCase()) !==-1);
      this.releaseyearFilteredMovieList = this.filteredMovieList;
    }
    else {
      this.filteredMovieList = this.titleFilteredMovieList.filter(x=> x.release_date.toLocaleLowerCase().indexOf(ev.toLocaleLowerCase()) !==-1);
      this.releaseyearFilteredMovieList = this.filteredMovieList;
    }

  }

  public ngOnDestroy(): void { 
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  } 
}
