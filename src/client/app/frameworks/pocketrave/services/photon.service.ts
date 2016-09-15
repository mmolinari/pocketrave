import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {LogService} from '../../core/services/log.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class PhotonService {
  private requestURl: string;
  private accessToken: string;

  constructor(
    private logger: LogService,
    private http: Http) {
      logger.debug(`Photon initializing...`);
      //device id
      this.requestURl = 'https://api.particle.io/v1/devices/3a0031001047353138383138/startRave/';
      //access token
      this.accessToken = '822a6a1265e7948ba1cfd7931eb4f63af04a1bf5';
  }

public startLightShow(mode: string) {

  let params = 'command=' + mode + '&access_token=' + this.accessToken;

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post(this.requestURl, params, {headers: headers})
    .map(res => res.json())
    .subscribe(
      data => params,
      err => this.handleError(err),
      () => console.log('Post Complete')
    );
}

  private handleError(error: Response) {
      return Observable.throw(error);
  }


}
