// libs
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'sd-kaleidoscope',
  templateUrl: 'kaleidoscope.component.html',
  styleUrls: ['kaleidoscope.component.css']
})
export class KaleidoscopeComponent implements OnDestroy {
  public rave: Observable<any>;
  id: any;
  url: any;
  image: any;
  private sub: any;


  constructor(   
    private sanitizer: DomSanitizer, 
    private route: ActivatedRoute, 
    private firebase: FirebaseService) {
        this.sub = this.route.params.subscribe((params:any) => {
        this.id = params['id'];
        this.firebase.getSelectedRave(this.id).then((rave:any) => {
          for (let prop in rave) {
            if (prop === 'url') {
              this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://w.soundcloud.com/player/?url='+rave[prop]+'&amp;color=000000&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false');
            }
            if (prop === 'image') {
              this.image = rave[prop];
            }
          }
      });
    });    
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}



