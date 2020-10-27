import {Injectable} from '@angular/core';
import DirectusSDK from '@directus/sdk-js';

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private internalSDKClient = new DirectusSDK({
    url: 'https://api.novaloop.ch',
    project: 'novaloop-api',
    mode: 'jwt'
  });

  public get api(): DirectusSDK {
    return this.internalSDKClient;
  }
}
