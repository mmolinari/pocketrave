// angular
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';

// app
//import { Config } from '../core/utils/config';
import { CoreModule } from '../core/core.module';
import { TOKENS_SHARED } from '../core/tokens';
import { POCKET_RAVE_PROVIDERS } from './services/index';
import { RAVE_COMPONENTS } from './components/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    RAVE_COMPONENTS
  ],
  exports: [
    RAVE_COMPONENTS
  ],
  providers: [
    POCKET_RAVE_PROVIDERS,
    TOKENS_SHARED
  ]
})
export class PocketRaveModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: PocketRaveModule,
      providers: configuredProviders
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: PocketRaveModule) {
    console.log(`PocketRaveModule constructor`);
    if (parentModule) {
      throw new Error('PocketRaveModule already loaded; Import in root module only.');
    }
  }
}
