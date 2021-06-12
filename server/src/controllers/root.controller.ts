import { IConfigService } from '@services';
import TYPES from '@types';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

export interface IRootController {
  index: (req: Request, res: Response) => Promise<void>;
  post: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class RootController implements IRootController {
  private readonly configService: IConfigService;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService) {
    this.configService = configService;
  }

  index = async (req: Request, res: Response) => {
    const { rootGreeting } = this.configService;

    res.send({ message: rootGreeting });
  };

  post = async (req: Request, res: Response) => {
    res.send({ url: 'some-url' })
  };
}
