import { Route } from '@angular/router';

import { ChooseComponent } from './choose.component';

export const ChooseRoutes: Route[] = [
  {
    path: 'choose/:id',
    component: ChooseComponent
  },
];
