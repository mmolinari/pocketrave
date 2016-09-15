import {Routes} from '@angular/router';

import {HomeRoutes} from './components/home/home.routes';
import {ChooseRoutes} from './components/choose/choose.routes';
import {LightShowRoutes} from './components/lightshow/lightshow.routes';
import {KaleidoscopeRoutes} from './components/kaleidoscope/kaleidoscope.routes';
import {CreateRoutes} from './components/create/create.routes';
import {SoundCloudRoutes} from './components/soundcloud/soundcloud.routes';
import {AboutRoutes} from './components/about/about.routes';

export const routes: Routes = [
  ...HomeRoutes,
  ...ChooseRoutes,
  ...LightShowRoutes,
  ...CreateRoutes,
  ...SoundCloudRoutes,
  ...KaleidoscopeRoutes,
  ...AboutRoutes
];
