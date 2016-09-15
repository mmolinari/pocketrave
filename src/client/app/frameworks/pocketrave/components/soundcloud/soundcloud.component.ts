import {Inject, OnInit, OnDestroy} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {LOADER, APPSETTINGS, DIALOGS, AUDIO, FRAME, SEARCHBAR} from '../../../core/tokens';
import {SoundCloudModel} from '../../../pocketrave/models/soundcloud.model';
import {SoundCloudService} from '../../../pocketrave/services/soundcloud.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Config} from '../../../core/utils/config';


@BaseComponent({
  moduleId: module.id,
  selector: 'sd-soundcloud',
  templateUrl: 'soundcloud.component.html'
})
export class SoundCloudComponent implements OnInit, OnDestroy {

  public tracks$: BehaviorSubject<Array<SoundCloudModel>> = new BehaviorSubject([]);
  
  private isPlaying: Boolean = false;
  private player: any;
  private currentUrl: string;
  
  
  constructor(
    private logger: LogService,
    private _router: Router,
    private soundcloud: SoundCloudService,
    @Inject(APPSETTINGS) private appSettings: any,
    @Inject(LOADER) private LoadingIndicator: any,
    @Inject(DIALOGS) private dialogs: any,
    @Inject(AUDIO) private audio: any,
    @Inject(FRAME) private frame: any,
    @Inject(SEARCHBAR) private searchbar: any) {
      this.logger.debug(appSettings.getString('fileName'));
  }

  public search(e: any) {
    if (e && e.object) {
      
      
        

      this.LoadingIndicator.show({ message: 'Finding tracks...' });
      this.soundcloud.search(e.object.text)
        .subscribe((tracks: Array<SoundCloudModel>) => {
          this.logger.debug(`Found ${tracks.length} tracks.`);
          this.tracks$.next(tracks);
          this.LoadingIndicator.hide();
          if (Config.IS_MOBILE_NATIVE()) {
            if (this.frame.topmost().android) {
              let sb = this.searchbar.nativeElement;
              sb.dismissSoftInput();
            } 
          } 
        });
    }
  }

  public goHome() {   
      this.player.dispose().then(() => {
           this._router.navigate(['/']);
        }, (err:any) => {
        console.log(err);
      });      
  }

  public clear() {
    //todo
  }

  public selectTrack(item: any) {
    let image = this.appSettings.getString('fileName');
    //write to firebase
    var options = {
      title: 'Song Selected!',
      message: 'Do you want to complete your PocketRave by adding this song selection?',
      okButtonText: 'Yes',
      cancelButtonText: 'No'
    };
    this.dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this.soundcloud.createRave(image, item.uri, item.title)
          .then(() => {
            this.goHome();
          }, (err: any) => {
            console.log(err);
          });
      }
    });
  }

  public help() {
    var options = {
      title: 'Add a Track',
      message: 'Pair the image you just drew with a song! Click on the arrow to listen, and complete the PocketRave in the window that pops up. \n\n\n View your completed PocketRaves online at http://pocketrave.me',
      cancelButtonText: 'Rock On!'
    };
    this.dialogs.confirm(options).then((result: boolean) => {
      if (result === true) {
       this._router.navigate(['/']);
      }
    });
  }

  public playAudio(filepath: string, fileType: string) {
    
    try {
      var playerOptions = {
        audioFile: filepath,

        completeCallback: () => {
          this.isPlaying = false;
          /*this.player.pause().then(() => {

          }, (err: any) => {

          });*/
          this.player.pause();
        },

        errorCallback: (err: any) => {
          console.log(err);
          this.isPlaying = false;
        },

        infoCallback: (info: any) => {
          alert('Info callback: ' + info.msg);
        }
      };

      this.isPlaying = true;


      this.player.playFromUrl(playerOptions).then(() => {
        this.isPlaying = true;
      }, (err: any) => {
        console.log(err);
        this.isPlaying = false;
      });

    } catch (ex) {
      console.log(ex);
    }
  }

  public playTrack(item: any) {
    let url = item.stream_url + '?client_id=2c9246f94f06d25e2e728935dfd79f8f';
    
    if (this.player) this.player.pause();
    
    if (this.currentUrl !== url) {
      this.selectTrack(item);
      this.playAudio(url, 'remoteFile');
    } else if (this.isPlaying) {
      this.isPlaying = false;
      if (this.player) {
        this.player.pause();
      }
    } else {
      this.isPlaying = true;
      //allow choice
      this.player.play();
    }
    this.currentUrl = url;
  }
  
  

  ngOnInit() {
    this.player = new this.audio.TNSPlayer();
  }

  ngOnDestroy() {
    if (this.player) this.player.dispose();
  }
}
