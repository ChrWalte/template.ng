import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { IAppConfig } from '../../interfaces/iapp-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // config asset file location:
  readonly configFilePath: string = `assets/config/config.${environment.name}.json`;

  // the current config instance:
  configuration!: IAppConfig;

  constructor(private http: HttpClient) {
    this.readConfig();
  }

  // read the config file and store it in the configuration property
  readConfig() {
    this.http.get(this.configFilePath).subscribe((response: unknown) => {
      this.configuration = response as IAppConfig;

      console.log(
        `[ConfigService.readConfig - configuration: ${JSON.stringify(
          this.configuration
        )}]`
      );
    });
  }

  // override the current configuration
  overwriteConfig(config: IAppConfig) {
    this.configuration = config;

    console.log(
      `[ConfigService.readConfig - overwrote configuration: ${JSON.stringify(
        this.configuration
      )}]`
    );
  }
}
