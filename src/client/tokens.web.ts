import {FIREBASE, FILE_SYSTEM, ENUMS, IMAGE_SOURCE} from './app/frameworks/core/tokens';
var firebasePlugin = require('firebase');

export const TOKENS_WEB: Array<any> = [
  {
    provide: FIREBASE, useFactory: () => {
      return firebasePlugin.firebase;
    }
  },
  { provide: FILE_SYSTEM, useValue: {} },
  { provide: ENUMS, useValue: {} },
  { provide: IMAGE_SOURCE, useValue: {} }
];
