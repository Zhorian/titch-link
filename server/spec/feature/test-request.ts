import { IApp } from '@app';
import DIContainer from '@di';
import { IConfigService, ILinkKeyGeneratorService } from '@services';
import TYPES from '@types';
import request from 'supertest';
import { MockedConfigService, MockedLinkKeyGeneratorService } from './mocks';

DIContainer.unbind(TYPES.ConfigService);
DIContainer.bind<IConfigService>(TYPES.ConfigService).to(MockedConfigService).inSingletonScope();

// This generates a random string so we need to mock it
// so we know what to expect out of it.
DIContainer.unbind(TYPES.LinkKeyGeneratorService);
DIContainer
  .bind<ILinkKeyGeneratorService>(TYPES.LinkKeyGeneratorService)
  .to(MockedLinkKeyGeneratorService)
  .inSingletonScope();

const appBooter = DIContainer.get<IApp>(TYPES.App);

export default request(appBooter.app);
