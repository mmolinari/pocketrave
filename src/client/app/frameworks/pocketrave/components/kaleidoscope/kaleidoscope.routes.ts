import { Route } from '@angular/router';
import { KaleidoscopeComponent } from './kaleidoscope.component';

export const KaleidoscopeRoutes: Route[] = [
  {
    path: 'kaleidoscope/:id',
    component: KaleidoscopeComponent
  },

];
