import { Container } from 'inversify';
import { App, IApp } from '@app';
import {
  IPingController, PingController,
  IRootController, RootController,

} from '@controllers';
import { TYPES } from '@types';
import {
  IConfigService, ConfigService,
  IRouteService, RouteService,
  ILinkKeyGeneratorService, LinkKeyGeneratorService,
  IStorageService, StorageService, ISwaggerService, SwaggerService,
} from '@services';
import {
  IPingRouter, PingRouter,
  IRootRouter, RootRouter,
} from '@routing';

const DIContainer = new Container();
DIContainer.bind<IApp>(TYPES.App).to(App).inSingletonScope();
DIContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
DIContainer.bind<IRouteService>(TYPES.RouteService).to(RouteService).inSingletonScope();
DIContainer.bind<IStorageService>(TYPES.StorageService).to(StorageService).inSingletonScope();
DIContainer.bind<ISwaggerService>(TYPES.SwaggerService).to(SwaggerService).inSingletonScope();
DIContainer
  .bind<ILinkKeyGeneratorService>(TYPES.LinkKeyGeneratorService)
  .to(LinkKeyGeneratorService)
  .inSingletonScope();

DIContainer.bind<IPingController>(TYPES.PingController).to(PingController).inSingletonScope();
DIContainer.bind<IRootController>(TYPES.RootController).to(RootController).inSingletonScope();

DIContainer.bind<IPingRouter>(TYPES.PingRouter).to(PingRouter).inSingletonScope();
DIContainer.bind<IRootRouter>(TYPES.RootRouter).to(RootRouter).inSingletonScope();

export default DIContainer;
