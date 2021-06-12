import { injectable } from 'inversify';

export interface ILinkKeyGeneratorService {
  generateLinkKey: () => string;
}

@injectable()
export class LinkKeyGeneratorService implements ILinkKeyGeneratorService {
  // Could throw this in config later on.
  private readonly KEY_SIZE = 8;

  generateLinkKey = () => this.randomString()

  private randomString = (): string => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < this.KEY_SIZE; i += 1) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
