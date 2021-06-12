import { IConfigService, ILinkKeyGeneratorService } from '@services';
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

  private readonly linkKeyGeneratorService: ILinkKeyGeneratorService;

  constructor(
    @inject(TYPES.ConfigService) configService: IConfigService,
    @inject(TYPES.LinkKeyGeneratorService) linkKeyGeneratorService: ILinkKeyGeneratorService,
  ) {
    this.configService = configService;
    this.linkKeyGeneratorService = linkKeyGeneratorService;
  }

  index = async (req: Request, res: Response) => {
    const { rootGreeting } = this.configService;

    res.send({ message: rootGreeting });
  };

  post = async (req: Request, res: Response) => {
    const { serverHost } = this.configService;
    const key = this.linkKeyGeneratorService.generateLinkKey();

    res.send({ url: `${serverHost}/${key}` });
  };
}
