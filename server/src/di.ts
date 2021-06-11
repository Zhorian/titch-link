import { Container } from 'inversify';
import { App, IApp } from '@app';
import { TYPES } from './types';
import {
  IConfigService, ConfigService, IRouteService, RouteService,
} from './services';

const DIContainer = new Container();
DIContainer.bind<IApp>(TYPES.App).to(App).inSingletonScope();
DIContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
DIContainer.bind<IRouteService>(TYPES.RouteService).to(RouteService).inSingletonScope();

export default DIContainer;
