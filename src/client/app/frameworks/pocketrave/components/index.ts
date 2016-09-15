import { NavbarComponent } from './app/navbar.component';
import { ChooseComponent } from './choose/choose.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { KaleidoscopeComponent } from './kaleidoscope/kaleidoscope.component';
import { LightShowComponent } from './lightshow/lightshow.component';
import { SoundCloudComponent } from './soundcloud/soundcloud.component';
import { AboutComponent } from './about/about.component';

// not for routes
export const RAVE_COMPONENTS: any[] = [
  NavbarComponent
];

// for routes
export const ENTRY_COMPONENTS: any[] = [
  HomeComponent,
  ChooseComponent,
  LightShowComponent,
  CreateComponent,
  SoundCloudComponent,
  KaleidoscopeComponent,
  AboutComponent
];

export * from './app/app.component';
export * from './app/navbar.component';
export * from './choose/choose.component';
export * from './create/create.component';
export * from './home/home.component';
export * from './kaleidoscope/kaleidoscope.component';
export * from './lightshow/lightshow.component';
export * from './soundcloud/soundcloud.component';
export * from './about/about.component';
