import {ViewChild, ElementRef, Inject, NgZone} from '@angular/core';
import {BaseComponent} from '../../../core/decorators/base.component';
import {LogService} from '../../../core/services/log.service';
import {UtilsService} from '../../../core/services/utils.service';
import {Config} from '../../../core/utils/config';
import {FILE_SYSTEM, IMAGE_SOURCE, ENUMS, DIALOGS, APPSETTINGS, LOADER, COLOR, COLORPICKER, FRAME} from '../../../core/tokens';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {throttle} from 'lodash';


@BaseComponent({
  moduleId: module.id,
  selector: 'sd-create',
  templateUrl: 'create.component.html'
})
export class CreateComponent {

  @ViewChild('DrawingPad') DrawingPad: ElementRef;
  public penColor$: BehaviorSubject<string> = new BehaviorSubject('#FFF');
  public penWidth$: BehaviorSubject<number> = new BehaviorSubject(3);
  public widthChangeThrottle: Function;

  constructor(private _router: Router,
    private logger: LogService,
    private firebase: FirebaseService,
    private utils: UtilsService,
    private ngZone: NgZone,
    @Inject(DIALOGS) private dialogs: any,
    @Inject(FILE_SYSTEM) private fs: any,
    @Inject(IMAGE_SOURCE) private imageSource: any,
    @Inject(ENUMS) private enums: any,
    @Inject(APPSETTINGS) private appSettings: any,
    @Inject(LOADER) private LoadingIndicator: any,
    @Inject(COLOR) private Color: any,
    @Inject(COLORPICKER) private ColorPicker: any,
    @Inject(FRAME) private frame: any
  ) {
    // since (propertyChange) event binding is called many times a second, best to throttle it :)
    this.widthChangeThrottle = throttle(this.widthChange.bind(this), 500);
  }



  public saveDrawing(args: any) {

    if (Config.IS_MOBILE_NATIVE()) {

      let pad = this.DrawingPad.nativeElement;

      if (this.frame.topmost().ios) {
        pad.getDrawing().then((data: any) => {
        this.save(data);
      }, (err: any) => {
        this.LoadingIndicator.hide();
        alert(err);
        });
      } else {
          pad.getTransparentDrawing().then((data: any) => {
          this.save(data);
        }, (err: any) => {
          this.LoadingIndicator.hide();
          alert(err);
        });
      }

    }

  }

  public save(data: any) {
        let imgsrc = this.imageSource.fromNativeSource(data);
        let path = this.utils.documentsPath(`drawing-${Date.now()}.png`);
        imgsrc.saveToFile(path, this.enums.ImageFormat.png);
          this.LoadingIndicator.show({ message: 'Saving your drawing!' });
        this.firebase.uploadFile(path).then((uploadedFile: any) => {
          this.LoadingIndicator.hide();
          this.appSettings.setString('fileName', uploadedFile.name);
          this._router.navigate(['/soundcloud']);
        }, (error: any) => {
          this.LoadingIndicator.hide();
          alert('File upload error: ' + error);
        });

  }

  public goHome() {
    this._router.navigate(['/']);
  }

  public clearDrawing(args: any) {

    var pad = this.DrawingPad.nativeElement;
    pad.clearDrawing();

  }

  public selectColor() {

    this.ColorPicker.show(this.penColor$.getValue(), 'HEX').then((result: any) => {
      console.log(result);
      this.ngZone.run(() => {
        this.penColor$.next(result);
      });
    }).catch((err: any) => {
      console.log(err);
    });

  }

  public widthChange(e: any) {
    if (e && e.value) {
      // since we throttle this callback, run in zone to be safe
      this.ngZone.run(() => {
        this.penWidth$.next(Math.floor(e.value));
      });
    }
  }

}
