import {Component} from '@angular/core';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {RaveModel} from '../../../pocketrave/models/rave.model';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  moduleId: module.id,
  selector: 'sd-choose',
  templateUrl: 'choose.component.html',
  styleUrls: ['choose.component.css']
})

export class ChooseComponent {
public raves$: Observable<any>;
data: any;
error: any;
event: string;
sub: any;
//public size: number = 0;
isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);


constructor(private firebase: FirebaseService, private _router: Router, private activatedRoute: ActivatedRoute) { 
  this.isLoading$.next(true);
  this.sub = this.activatedRoute.params.subscribe((params: any) => {
  this.event = params['id'];
  this.firebase.getRaves(this.event).subscribe(
        data => {
            this.raves$ = data;
            this.isLoading$.next(false);
        },
        error => {
            this.error = error;
        });
    });

 }

public choose(rave: RaveModel) {
    this._router.navigate(['/view', rave.id]);
}


}
