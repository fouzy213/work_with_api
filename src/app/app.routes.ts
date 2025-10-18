import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Series } from './series/series';
import { Movies } from './movies/movies';
import { CardById } from './card-by-id/card-by-id';
const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },

  {
    path: 'series',
    component: Series,
    title: 'serie Page',
  },

  {
    path: 'movies',
    component: Movies,
    title: 'movie Page',
  },

  { path: ':type/:id', component: CardById, 
    title:'Card Page',
  },
];

export default routeConfig;
