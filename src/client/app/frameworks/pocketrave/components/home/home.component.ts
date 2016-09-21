import {OnInit, Inject} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {DIALOGS, FRAME} from '../../../core/tokens';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../../core/utils/config';
import {Router} from '@angular/router';

@BaseComponent({
  // moduleId: module.id,
  selector: 'sd-home',
  templateUrl: './app/frameworks/pocketrave/components/home/home.component.html',
  styleUrls: ['./app/frameworks/pocketrave/components/home/home.component.css']
})
export class HomeComponent implements OnInit {
  public raves$: Observable<any>;

  constructor(public firebase: FirebaseService,
              private logger: LogService,
              private _router: Router,
              @Inject(DIALOGS) private dialogs: any,
              @Inject(FRAME) private frame: any
              ) {}

 ngOnInit() {
    this.raves$ = this.firebase.getRaves();
    if (Config.IS_MOBILE_NATIVE()) {
      if (this.frame.topmost().ios) {
          this.frame.topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);
      } 
    } 
  }

  public create() {
    this._router.navigate(['/create']);
  }

  public info() {
    var options = {
      title: 'Play a PocketRave!',
      message: 'Play this PocketRave on the web with a beautiful visualization by visiting http://pocketrave.me.',
      cancelButtonText: 'Got it!'
    };
    this.dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this._router.navigate(['/']);
      }
    });
  }

  public help() {
    var options = {
      title: 'How to PocketRave',
      message: 'Create a PocketRave by drawing an image on the drawing pad with your choice of color and pen width. \n\n\n Save your drawing, then choose a song track from Soundcloud on the next screen by searching for a track by name or keyword. \n\n\n  Click the arrow to listen to a track, and click the track itself to select it for your PocketRave. \n\n\n View your completed PocketRaves online at http://pocketrave.me',
      cancelButtonText: 'Rock On!'
    };
    this.dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this._router.navigate(['/']);
      }
    });
  }
}
