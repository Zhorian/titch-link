export interface ILinkKeyGeneratorService {
  generateLinkKey: () => string;
}

export class LinkKeyGeneratorService implements ILinkKeyGeneratorService {
  generateLinkKey = () => 'some string'
}
