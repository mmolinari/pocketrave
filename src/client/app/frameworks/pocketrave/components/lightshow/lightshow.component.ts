import {Component} from '@angular/core';
import {PhotonService} from '../../../pocketrave/services/photon.service';

@Component({
  // moduleId: module.id,
  selector: 'sd-lightshow',
  templateUrl: './app/frameworks/pocketrave/components/lightshow/lightshow.component.html',
  styleUrls: ['./app/frameworks/pocketrave/components/lightshow/lightshow.component.css']
})
export class LightShowComponent {
  constructor(private photonservice: PhotonService) {
  }
  public startLightShow(mode: string) {
    this.photonservice.startLightShow(mode);
  }
}
