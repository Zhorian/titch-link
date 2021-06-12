import { IConfigService } from '@services';
import { injectable } from 'inversify';

// Mocking the config for all tests
@injectable()
export class MockedConfigService implements IConfigService {
  readonly nodeEnvironment = 'test';

  readonly port = 8081;

  readonly rootGreeting = 'Greetings from mock config!'

  readonly serverHost = 'https://titchlink.com'
}

export default MockedConfigService;
