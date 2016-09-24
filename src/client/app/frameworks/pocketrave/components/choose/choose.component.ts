import {OnInit, Component, NgZone} from '@angular/core';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {RaveModel} from '../../../pocketrave/models/rave.model';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sd-choose',
  templateUrl: 'choose.component.html',
  styleUrls: ['choose.component.css']
})
export class ChooseComponent implements OnInit {
public raves$: Observable<any>;
public size: number = 0;

constructor(private firebase: FirebaseService, private _router: Router, private ngZone: NgZone) { 
 }

 ngOnInit() {
   this.ngZone.run(() => {
    //timeout doesn't seem to help
    //setTimeout( () => {
      this.raves$ = this.firebase.getRaves();
          this.raves$.forEach((item) => {
            this.size++;
          })
     // }, 3000);    
   });
  }

public choose(rave: RaveModel) {
    this._router.navigate(['/view', rave.id]);
}

}
