import {Injectable, Inject} from '@angular/core';
//import {Config} from './config.service';
import {FILE_SYSTEM} from '../tokens';

@Injectable()
export class UtilsService {

  constructor(@Inject(FILE_SYSTEM) private fs: any) { }

  public getFilename(path: string) {
    let parts = path.split('/');
    return parts[parts.length - 1];
  }

  public documentsPath(filename: string) {
    return `${this.fs.knownFolders.documents().path}/${filename}`;
  }
}
