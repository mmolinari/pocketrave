import {FIREBASE, FILE_SYSTEM, ENUMS, IMAGE_SOURCE, DIALOGS, APPSETTINGS, SEARCHBAR, LOADER, AUDIO, COLOR, COLORPICKER, FRAME} from './app/frameworks/core/tokens';
var firebase = require("nativescript-plugin-firebase");
import * as fs from 'file-system';
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import * as dialogs from 'ui/dialogs';
import * as frame from 'ui/frame';
import * as appSettings from 'application-settings';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { Color } from 'color';
import { ColorPicker } from 'nativescript-color-picker';
import * as audio from 'nativescript-audio';
import * as searchbar from 'ui/search-bar';


export const TOKENS_NATIVE: Array<any> = [
  {
    provide: FIREBASE, useFactory: () => {
      return firebase;
    }
  },
  { provide: FILE_SYSTEM, useValue: fs },
  { provide: ENUMS, useValue: enums },
  { provide: IMAGE_SOURCE, useValue: imageSource },
  { provide: DIALOGS, useValue: dialogs },
  { provide: APPSETTINGS, useValue: appSettings},
  { provide: LOADER, useClass: LoadingIndicator},
  { provide: COLOR, useValue: Color },
  { provide: FRAME, useValue: frame },
  { provide: SEARCHBAR, useValue: searchbar },
  { provide: COLORPICKER, useClass: ColorPicker },
  { provide: AUDIO, useValue: audio }
];