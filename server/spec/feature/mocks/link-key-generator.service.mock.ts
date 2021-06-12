import { ILinkKeyGeneratorService, LinkKeyGeneratorService } from '@services';
import { injectable } from 'inversify';
import MockedConfigService from './config.service.mock';

@injectable()
export class MockedLinkKeyGeneratorService implements ILinkKeyGeneratorService {
  generateLinkKey = () => 'abcdefgh'
}

export default MockedConfigService;
