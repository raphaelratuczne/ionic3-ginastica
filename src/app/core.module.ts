import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
// import { HttpClient, HttpHandler } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
// import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

// import { HttpCore } from './core/http';
// import { ErrorCore } from './core/error';
// import { LocalStorageCore } from './core/local-storage';
// import { UtilsCore } from './core/utils';
// import { AutenticacaoService } from './services/autenticacao.service';
// import { AutenticacaoProvider } from './providers/autenticacao.provider';
// import { EmpresaService } from './services/empresa.service';
// import { EmpresaProvider } from './providers/empresa.provider';
import { AuthService } from '../services/auth.service';

// export function httpFactory(handler: HttpHandler, http: HttpClient, autenticacao:AutenticacaoProvider) {
//   return new HttpCore(handler, http, autenticacao);
// };

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    // HttpCore,
    // ErrorCore,
    // LocalStorageCore,
    // UtilsCore,
    // AutenticacaoService,
    // AutenticacaoProvider,
    // EmpresaService,
    // EmpresaProvider,
    AuthService,
    AngularFireAuth
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // {
        //   provide: HttpCore,
        //   useFactory: httpFactory,
        //   deps: [HttpHandler, HttpClient, AutenticacaoProvider]
        // },
        // {
        //   provide: ErrorStateMatcher,
        //   useClass: ShowOnDirtyErrorStateMatcher
        // }
      ]
    }
  }
}
