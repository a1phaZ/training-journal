import { environment } from './environments/environtment';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { InitializeAppService } from './app/services/initialize.app.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SQLiteService } from './app/services/sqlite.service';
import { StorageService } from './app/services/storage.service';
import { DbnameVersionService } from './app/services/dbname-version.service';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngxs/store';
import { WorkoutState } from './app/workout/workout.state';

if (environment.production) {
  enableProdMode();
}

const platform = Capacitor.getPlatform();
if(platform === "web") {
  // Web platform
  // required for toast component in Browser
  pwaElements(window);

  // required for jeep-sqlite Stencil component
  // to use a SQLite database in Browser
  jeepSqlite(window);

  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    await customElements.whenDefined('jeep-sqlite');
    jeepEl.autoSave = true;
  });
}

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

bootstrapApplication(AppComponent, {
  providers: [
    SQLiteService,
    InitializeAppService,
    StorageService,
    DbnameVersionService,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
    },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(appRoutes),
    provideStore([WorkoutState]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    }
  ]
})

// platformBrowserDynamic()
//   .bootstrapModule(AppModule, {
//     ngZoneEventCoalescing: true,
//   })
//   .catch((err) => console.error(err));
