import { Routes } from "@angular/router";
import { Home } from "./app/home/home";
import { Series } from "./app/series/series";
import { Movies } from "./app/movies/movies";
const routeConfig:Routes = [
    {
        path:'',
        component:Home,
        title:'Home Page'
    },


 {
        path:'series',
        component:Series,
        title:'serie Page'
    },

   {
        path:'movies',
        component:Movies,
        title:'movie Page'
    },




];


export default routeConfig;