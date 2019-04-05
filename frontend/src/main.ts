import { BASE_PATH } from './app/http/variables';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { environmentLoader as environmentLoaderPromise } from './environments/environmentLoader';
import 'hammerjs';

environmentLoaderPromise.then(env => {
  if (environment.production) {
    enableProdMode();
  }
  environment.apiUrl = env.apiUrl;
  platformBrowserDynamic([{ provide: BASE_PATH, useValue: env['api_url'] }]).bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
