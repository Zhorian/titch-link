import { injectable } from 'inversify';

export interface IConfigService {
  readonly rootGreeting: string;
  readonly port: number;
  readonly nodeEnvironment: string;
}

@injectable()
export class ConfigService implements IConfigService {
  readonly port: number;
  readonly nodeEnvironment: string;
  readonly rootGreeting: string;

  constructor() {
    this.port = +(process.env.PORT || 8080);
    this.nodeEnvironment = process.env.NODE_ENV || 'production';
    this.rootGreeting = `Greetings from the config service! Now with aliases!!!`;
  }
}
