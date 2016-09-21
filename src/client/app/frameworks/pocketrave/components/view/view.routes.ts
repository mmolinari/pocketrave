import { Route } from '@angular/router';
import { ViewComponent } from './view.component';

export const ViewRoutes: Route[] = [
  {
    path: 'view/:id',
    component: ViewComponent
  },

];
