import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component'
export const routes: Routes = [
    {
         path: '', 
         component: MovieListComponent
    },
    { 
        path: 'movies', 
        component: MovieListComponent
    },
    {
        path: 'movies/:movieId',
        component: MovieDetailsComponent
    }
];
