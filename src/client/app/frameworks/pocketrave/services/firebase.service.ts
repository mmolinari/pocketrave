import {Injectable, Inject, NgZone} from '@angular/core';
import {LogService} from '../../core/services/log.service';
import {Config} from '../../core/utils/config';
import {UtilsService} from '../../core/services/utils.service';
import {FIREBASE, FILE_SYSTEM, LOADER} from '../../core/tokens';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {RaveModel, EventModel} from '../models';


declare var zonedCallback: Function;

@Injectable()
export class FirebaseService {
  items: BehaviorSubject<Array<RaveModel>> = new BehaviorSubject([]); 
  public _allRaves: Array<RaveModel> = [];
  events: BehaviorSubject<Array<RaveModel>> = new BehaviorSubject([]); 
  public _allEvents: Array<RaveModel> = [];
  private _database: any;

  constructor(
    private logger: LogService,
    private utils: UtilsService,
    private ngZone: NgZone,
    @Inject(FIREBASE) private firebase: any,
    @Inject(FILE_SYSTEM) private fileSystem: any,
    @Inject(LOADER) private LoadingIndicator: any) {
    logger.debug(`FirebaseService initializing...`);

    if (Config.IS_MOBILE_NATIVE()) {

      // nativescript
      firebase.init({
        persist: true,
        storageBucket: 'gs://pocketrave-644be.appspot.com',
        // iOSEmulatorFlush: true,
        onAuthStateChanged: (data: any) => {
          this.logger.debug(`Logged ${data.loggedIn ? 'into' : 'out of'} firebase.`);
        }
      }).then(() => {
        this.logger.debug('firebase.init done');
      }, (error: any) => {
        this.logger.debug('firebase.init error: ' + error);
      });

    } else {

      // web
      let config = {
        apiKey: 'AIzaSyD-tez3SUni1wI7aNNcHsPRpyXwF09ywTk',
        authDomain: 'pocketrave-644be.firebaseapp.com',
        databaseURL: 'https://pocketrave-644be.firebaseio.com',
        storageBucket: 'pocketrave-644be.appspot.com'
      };
      firebase.initializeApp(config);
      this._database = firebase.database();
    }
  }

  public authenticate(email: string, pass: string) {
    this.logger.debug(`authenticate: ${email}, ${pass}`);
    if (Config.IS_MOBILE_NATIVE()) {
      this.firebase.login({
        type: this.firebase.LoginType.PASSWORD,
        email: email,
        password: pass
      }).then((result: any) => {
        this.logger.debug(`firebase authenticate success.`);
        // no need to handle anything here since we use `onAuthStateChanged` in init
      }, (error: any) => {
        this.logger.debug(`firebase auth error:`);
        this.logger.debug(error);
      });
    }
  }

  public uploadFile(localPath: string, file?: any): Promise<any> {
    let filename = this.utils.getFilename(localPath);
    let remotePath = `${filename}`;
    if (Config.IS_MOBILE_NATIVE()) {
      return this.firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath
      });
    } else {
      return this.firebase.storage().ref().child(remotePath).put(file);
    }
  }

  public createRave(image: string, url: string, title: string): Promise<any> {

   return this.firebase.push(
      '/Raves',
      {
        'image': 'https://firebasestorage.googleapis.com/v0/b/pocketrave-644be.appspot.com/o/'+image+'?alt=media&token=abc',
        'url': url,
        'title': title,
        'date': 0 - Date.now()
      }
    );
  }  

  public getRaves(event:string): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Raves';
      let listener: any;
      
      if (Config.IS_MOBILE_NATIVE()) {
          
        this.LoadingIndicator.show({ message: 'Finding PocketRaves...' });
          
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value, path, event);
            observer.next(results);
          });
        };

        this.firebase.addValueEventListener(onValueEvent, `/${path}`).then(() => {
          console.log(`firebase listener setup.`);
          this.LoadingIndicator.hide();
        });

      } else {
        listener = this.firebase.database().ref(path).orderByChild('date')
          .on('value', (snapshot:any) => {
            this.ngZone.run(() => {
              observer.next(this.handleSnapshot(snapshot.val(), path, event));
            });
          }, observer.error);
      }

      return () => {
        // Unsubscribe
        console.log('unsubscribe raves');
        if (Config.IS_MOBILE_NATIVE()) {
          // nothing needs to clean up with native firebase I don't think?
          // may need to check with Eddy, but should be ok for now
        } else {
          // cleanup and detach listener
          this.firebase.database().ref(path).off('value', listener);
        }     
      };
    }).share();
  }

  public getEvents(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Events';
      let listener: any;

      if (Config.IS_MOBILE_NATIVE()) {
          
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleEventSnapshot(snapshot.value, path);
            observer.next(results);
          });
        };

        this.firebase.addValueEventListener(onValueEvent, `/${path}`).then(() => {
          console.log(`firebase listener setup.`);
        });

      } else {
        listener = this.firebase.database().ref(path).orderByChild('id')
          .on('value', (snapshot:any) => {
            this.ngZone.run(() => {
              observer.next(this.handleEventSnapshot(snapshot.val(), path));
            });
          }, observer.error);
      }

      return () => {
        // Unsubscribe
        console.log('unsubscribe raves');
        if (Config.IS_MOBILE_NATIVE()) {
          // nothing needs to clean up with native firebase I don't think?
          // may need to check with Eddy, but should be ok for now
        } else {
          // cleanup and detach listener
          this.firebase.database().ref(path).off('value', listener);
        }     
      };
    }).share();
  }

  public getSelectedRave(id: string) {
    return new Array((resolve) => {
      let complete = () => {
        resolve(this._allRaves.filter(s => s.id === id)[0]);
      };
      if (this._allRaves.length) {
        complete();
      } else {
        let sub = this.getRaves("all").subscribe((raves: any) => {
          sub.unsubscribe();
          complete();
        });
      }
    });
  }

  private handleSnapshot(data: any, path: string, event: string) {
    //empty array, then refill
    this._allRaves = [];
    if (path)
      console.log(`value ${path}:`, data);

    if (data) {
      for (let id in data) {
        let result = (<any>Object).assign({id: id}, data[id]);
        console.log(event,result.event)
          if(event == "all" || event == result.event){
            this._allRaves.push(result)
          };
      }
      this.publishUpdates();
    }
    return this._allRaves;
  }

  private handleEventSnapshot(data: any, path?: string) {
    //empty array, then refill
    this._allEvents = [];
    if (path)
      if (data) {
        for (let id in data) {
          let result = (<any>Object).assign({id: id}, data[id]);
          this._allEvents.push(result);
        }
        this.publishEventUpdates();
      }
    return this._allEvents;
  }


  private publishUpdates() {
    this._allRaves.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    });
    this.items.next([...this._allRaves]);
  }

  private publishEventUpdates() {
    this.events.next([...this._allEvents]);
  }

}
