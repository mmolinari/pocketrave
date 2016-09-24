import {Component} from '@angular/core';
import {PhotonService} from '../../../pocketrave/services/photon.service';

@Component({
  moduleId: module.id,
  selector: 'sd-lightshow',
  templateUrl: 'lightshow.component.html',
  styleUrls: ['lightshow.component.css']
})
export class LightShowComponent {
  constructor(private photonservice: PhotonService) {
  }
  public startLightShow(mode: string) {
    this.photonservice.startLightShow(mode);
  }
}
