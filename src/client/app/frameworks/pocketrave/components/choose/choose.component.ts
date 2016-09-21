import {OnInit, Component} from '@angular/core';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {RaveModel} from '../../../pocketrave/models/rave.model';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  // moduleId: module.id,
  selector: 'sd-choose',
  templateUrl: './app/frameworks/pocketrave/components/choose/choose.component.html',
  styleUrls: ['./app/frameworks/pocketrave/components/choose/choose.component.css']
})
export class ChooseComponent implements OnInit {
public raves$: Observable<any>;

  
constructor(private firebase: FirebaseService, private _router: Router) { 
 }

 ngOnInit() {
    this.raves$ = this.firebase.getRaves();
  }

public choose(rave: RaveModel) {
    this._router.navigate(['/kaleidoscope', rave.id]);
}

}
