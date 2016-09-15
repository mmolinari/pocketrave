// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';
import { NativescriptPlatformLocation } from 'nativescript-angular/router/ns-platform-location';
import { NSLocationStrategy } from 'nativescript-angular/router/ns-location-strategy';

import {registerElement} from 'nativescript-angular/element-registry';
registerElement("DrawingPad", () => require("nativescript-drawingpad").DrawingPad);
registerElement("PlayPause", () => require("nativescript-play-pause-button").PlayPauseButton);

// angular
import { NgModule, enableProdMode } from '@angular/core';

// libs
import {TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ng2-fonticon';

// app
import { Config, WindowService, ConsoleService, RouterExtensions } from './app/frameworks/core/index';
import { NSAppComponent } from './pages/app/app.component';
import { TOKENS_NATIVE } from './tokens.native';

//pocketrave
import { AppComponent, ENTRY_COMPONENTS } from './app/frameworks/pocketrave/index';
import { routes } from './app/frameworks/pocketrave/routes';
import { PocketRaveModule } from './app/frameworks/pocketrave/pocketrave.module';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';

// {N} custom app specific
import { WindowNative } from './shared/core/index';
import { NS_ANALYTICS_PROVIDERS } from './shared/nativescript/index';

enableProdMode();

// intermediate component module
// helps encapsulate custom native modules in with the components
// note: couple ways this could be done, just one option presented here...
@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule
  ],
  declarations: [
    TNSFontIconPipe,
    TNSFontIconPurePipe,
    ENTRY_COMPONENTS
  ],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule
  ]
})
class ComponentModule { }

@NgModule({
  imports: [
    CoreModule.forRoot([
      { provide: WindowService, useClass: WindowNative },
      { provide: ConsoleService, useValue: console }
    ]),
    AnalyticsModule,
    ComponentModule,
    PocketRaveModule.forRoot([
      TOKENS_NATIVE,
      {
        provide: TNSFontIconService,
        useFactory: () => {
          return new TNSFontIconService({
            'fa': 'fonts/font-awesome.css',
            'ion': 'fonts/ionicons.css'
          });
        }
      }
    ]),
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    NSAppComponent
  ],
  providers: [
    NS_ANALYTICS_PROVIDERS,
    { provide: RouterExtensions, useClass: TNSRouterExtensions }
  ],
  bootstrap: [NSAppComponent]
})

export class NativeModule { }
