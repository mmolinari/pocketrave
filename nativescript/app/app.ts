// nativescript
import { NativeScriptModule, platformNativeScriptDynamic, onAfterLivesync, onBeforeLivesync } from 'nativescript-angular/platform';

/**
 * Config
 * Seed provided configuration options
 */
import { Config } from './app/frameworks/core/index';
import { Page } from 'ui/page';
Config.PageClass = Page;

// (required) platform target (allows component decorators to use the right view template)
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

// (optional) log level - defaults to no logging if not set
Config.DEBUG.LEVEL_4 = true;

// app
import { NativeModule } from './native.module';

// NJA: Fix for iOS font registration during webpack
if (global.NSObject && global.NSString) {
  var font = require("ui/styling/font");
  font.ios.registerFont('ionicons.ttf');
  font.ios.registerFont('fontawesome-webfont.ttf');
}

platformNativeScriptDynamic().bootstrapModule(NativeModule);
