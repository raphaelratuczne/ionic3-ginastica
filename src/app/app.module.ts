import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { CidadeProvider } from '../providers/cidade.provider';
import { EmpresaProvider } from '../providers/empresa.provider';
import { FaltaProvider } from '../providers/falta.provider';
import { SalaProvider } from '../providers/sala.provider';
import { AulaProvider } from '../providers/aula.provider';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebaseAppConfig = JSON.parse(atob('eyJhcGlLZXkiOiJBSXphU3lDc016Vm9TSUZVWE5DbGdaeWlnNDgzQ0tVOThRbWJGSjQiLCJhdXRoRG9tYWluIjoiZ2VyLWdpbmFzdGljYS1lbGFib3JhbC5maXJlYmFzZWFwcC5jb20iLCJkYXRhYmFzZVVSTCI6Imh0dHBzOi8vZ2VyLWdpbmFzdGljYS1lbGFib3JhbC5maXJlYmFzZWlvLmNvbSIsInByb2plY3RJZCI6Imdlci1naW5hc3RpY2EtZWxhYm9yYWwiLCJzdG9yYWdlQnVja2V0IjoiZ2VyLWdpbmFzdGljYS1lbGFib3JhbC5hcHBzcG90LmNvbSIsIm1lc3NhZ2luZ1NlbmRlcklkIjoiMzA3ODEyNTMyMTkzIn0='));

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    CidadeProvider,
    EmpresaProvider,
    FaltaProvider,
    SalaProvider,
    AulaProvider
  ]
})
export class AppModule { }
