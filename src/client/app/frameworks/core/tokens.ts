import {OpaqueToken} from '@angular/core';

export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');
export const FILE_SYSTEM: OpaqueToken = new OpaqueToken('file-system');
export const ENUMS: OpaqueToken = new OpaqueToken('enums');
export const IMAGE_SOURCE: OpaqueToken = new OpaqueToken('image-source');
export const DIALOGS: OpaqueToken = new OpaqueToken('dialogs');
export const APPSETTINGS: OpaqueToken = new OpaqueToken('appSettings');
export const LOADER: OpaqueToken = new OpaqueToken('LoadingIndicator');
export const COLOR: OpaqueToken = new OpaqueToken('Color');
export const COLORPICKER: OpaqueToken = new OpaqueToken('ColorPicker');
export const AUDIO: OpaqueToken = new OpaqueToken('TNSPlayer');
export const FRAME: OpaqueToken = new OpaqueToken('Frame');
export const SEARCHBAR: OpaqueToken = new OpaqueToken('SearchBar');

export const TOKENS_SHARED: Array<any> = [
  { provide: FIREBASE, useValue: {} },
  { provide: FILE_SYSTEM, useValue: {} },
  { provide: ENUMS, useValue: {} },
  { provide: IMAGE_SOURCE, useValue: {} },
  { provide: DIALOGS, useValue: {} },
  { provide: APPSETTINGS, useValue: {} },
  { provide: LOADER, useValue: {} },
  { provide: COLOR, useValue: {} },
  { provide: COLORPICKER, useValue: {} },
  { provide: AUDIO, useValue: {} },
  { provide: FRAME, useValue: {} },
  { provide: SEARCHBAR, useValue: {} }
];

