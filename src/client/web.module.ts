// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';

//pocketrave
import { TOKENS_WEB } from './tokens.web';
import { AppComponent } from './app/frameworks/pocketrave/components/app/app.component';
import { ENTRY_COMPONENTS } from './app/frameworks/pocketrave/components/index';
import { routes } from './app/frameworks/pocketrave/routes';
import { PocketRaveModule } from './app/frameworks/pocketrave/pocketrave.module';

// config
import { Config, WindowService, ConsoleService } from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
Config.DEBUG.LEVEL_4 = true;

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, {useHash: true});
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot([
      { provide: WindowService, useValue: window },
      { provide: ConsoleService, useValue: console }
    ]),
    routerModule,
    AnalyticsModule,
    PocketRaveModule.forRoot(TOKENS_WEB)
  ],
  declarations: [
    AppComponent,
    ENTRY_COMPONENTS
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [AppComponent]
})

export class WebModule { }
