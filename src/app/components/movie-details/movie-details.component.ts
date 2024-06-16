import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { movieDetail } from '../../movie-model/index'
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {CurrencyPipe} from '../../pipes/currency.pipe';
import {DurationPipePipe} from '../../pipes/duration-pipe.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CurrencyPipe,
    DurationPipePipe
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  public apiSubscription!: Subscription;
  public movieId: string| null ='';
  public movieDetails: movieDetail={};
  constructor(
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) {}

  public ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('movieId');
    this.fetchMovieDetails();
  }

  private fetchMovieDetails() {
    this.apiSubscription = this._dataService.getMovieDetail(this.movieId)
      .subscribe({
        next: (record: movieDetail) => {
         this.movieDetails = record;
        },
        error: err => console.error(err),
        complete: () => console.log("Step 1 data loaded...")
      })
  }

  public ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  } 

  backClicked() {
    this._location.back();
  }
}
