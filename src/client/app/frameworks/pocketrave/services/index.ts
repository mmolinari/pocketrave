import {FirebaseService} from './firebase.service';
import {SoundCloudService} from './soundcloud.service';
import {PhotonService} from './photon.service';

export const POCKET_RAVE_PROVIDERS: Array<any> = [
  FirebaseService, SoundCloudService, PhotonService
];

export * from './firebase.service';
export * from './soundcloud.service';
export * from './photon.service';
