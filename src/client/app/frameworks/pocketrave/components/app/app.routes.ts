// angular
import { Routes } from '@angular/router';

// app
import {HomeRoutes} from '../../components/home/home.routes';
import {ChooseRoutes} from '../../components/choose/choose.routes';
import {LightShowRoutes} from '../../components/lightshow/lightshow.routes';
import {ViewRoutes} from '../../components/view/view.routes';
import {CreateRoutes} from '../../components/create/create.routes';
import {SoundCloudRoutes} from '../../components/soundcloud/soundcloud.routes';

export const routes: Routes = [
  ...HomeRoutes,
  ...ChooseRoutes,
  ...LightShowRoutes,
  ...ViewRoutes,
  ...CreateRoutes,
  ...SoundCloudRoutes
];
