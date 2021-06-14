import { ITitchLinkModel } from '@models';
import { IConfigService, ILinkKeyGeneratorService, IStorageService } from '@services';
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

  private readonly storageService: IStorageService;

  constructor(
    @inject(TYPES.ConfigService) configService: IConfigService,
    @inject(TYPES.LinkKeyGeneratorService) linkKeyGeneratorService: ILinkKeyGeneratorService,
    @inject(TYPES.StorageService) storageService: IStorageService,
  ) {
    this.configService = configService;
    this.linkKeyGeneratorService = linkKeyGeneratorService;
    this.storageService = storageService;
  }

  index = async (req: Request, res: Response) => {
    const key = req.query.k;
    if (!key) {
      res
        .status(400)
        .send({
          message: 'No key provided',
        });
      return;
    }

    const rawData = this.storageService.find(`${key}.json`);
    if (!rawData) {
      res
        .status(404)
        .send({
          message: 'Not found',
        });
      return;
    }

    const model: ITitchLinkModel = JSON.parse(rawData);

    // There's a potential to add an extra var for auto redirect
    // I originally envisioned this being an api that serves a SPA front end

    // res.send({ url: model.url });

    res.redirect(model.url);
  };

  post = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
      res
        .status(400)
        .send({
          message: 'No url provided',
        });
      return;
    }

    const { serverHost } = this.configService;
    const key = this.linkKeyGeneratorService.generateLinkKey();
    const linkModel: ITitchLinkModel = {
      url,
    };

    this.storageService.save(`${key}.json`, JSON.stringify(linkModel));

    // Potentially this could do the redirecting itself
    // but this has been built as an api meaning I don't
    // see that as appropriate.
    res.send({ url: `${serverHost}/api?k=${key}` });
  };
}
