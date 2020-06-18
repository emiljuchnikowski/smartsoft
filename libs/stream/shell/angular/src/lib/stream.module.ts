import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import {RouterModule} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import { StreamConfig } from "./stream.config";
import { StreamComponentsModule } from "./components/components.module";
import { StreamProvider } from "./providers";
import { SocketService } from "./services/socket/socket.service";
import {setDefaultTranslationsAndLang} from "./translations-default";
import {StreamClientFacade, StreamSenderFacade} from "./facades";

@NgModule({
  exports: [StreamComponentsModule],
  imports: [StreamComponentsModule, RouterModule, TranslateModule],
  declarations: [],
  providers: [SocketService, StreamClientFacade, StreamSenderFacade]
})
export class StreamModule {
  static forFeature(config: StreamConfig): ModuleWithProviders {
    const providers: Provider[] = [
      { provide: StreamConfig, useValue: config },
      SocketService
    ];

    providers.push(
      config.provider
        ? { provide: StreamProvider, useValue: config.provider }
        : StreamProvider
    );

    return {
      ngModule: StreamModule,
      providers: providers
    };
  }

  constructor(translateService: TranslateService) {
    setDefaultTranslationsAndLang(translateService);
  }
}
