import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {LogService} from '../../core/services/log.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {FirebaseService} from '../services/firebase.service';
import {SoundCloudModel} from '../models/soundcloud.model';


@Injectable()
export class SoundCloudService {
  private requestURl: string;

  constructor(
    private logger: LogService,
    private firebase: FirebaseService,
    private http: Http) {
      logger.debug(`SoundCloudService initializing...`);
      this.requestURl = `http://api.soundcloud.com/tracks?client_id=2c9246f94f06d25e2e728935dfd79f8f&q=[q]`;
  }

  public search(q: string): Observable<any> {
    let soundcloudUrl = this.requestURl.replace('[q]', encodeURI(q));
    return this.http.get(soundcloudUrl)
      .map((res) => {
        let tracks = res.json();
        if (tracks && tracks.length) {
          for (let t of tracks) {
            // convert to model
            t = new SoundCloudModel(t);
          }
        }
        return tracks || [];
      })
      .catch(this.handleError);
	}

  public createRave(imageId: string,url: string, title: string) {
   return this.firebase.createRave(imageId,url,title);
  }

  private handleError(error: Response) {
      return Observable.throw(error);
  }


}
