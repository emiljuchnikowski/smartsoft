import { ModuleWithProviders, NgModule, Provider } from "@angular/core";

import { StreamConfig } from "./stream.config";
import { StreamComponentsModule } from "./components/components.module";
import { StreamProvider } from "./providers";
import { SocketService } from "./services/socket/socket.service";

@NgModule({
  exports: [StreamComponentsModule],
  imports: [StreamComponentsModule],
  declarations: [],
  providers: [SocketService]
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
}
