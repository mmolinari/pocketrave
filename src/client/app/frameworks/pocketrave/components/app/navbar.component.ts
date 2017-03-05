// app
import {Component} from '@angular/core';
import {EventModel} from '../../../pocketrave/models';
import {Observable} from 'rxjs/Observable';
import {FirebaseService} from '../../../pocketrave/services/firebase.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'] 
})
export class NavbarComponent {
  data: any;
  error: any;
  public events$: Observable<any>;

  constructor(private firebase: FirebaseService, private router: Router) { 

    this.firebase.getEvents().subscribe(
          data => {
              this.events$ = data;
          },
          error => {
              this.error = error;
          });
    }

    public selectEvent(event){
      this.router.navigate(['/choose', event.target.value])
    }
 

}
