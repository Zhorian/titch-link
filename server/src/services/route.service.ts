import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service';
import { TYPES } from '../types';

export interface IRouteService {
  setupRoutes: (app: Express) => void;
}

@injectable()
export class RouteService implements IRouteService {
  private readonly configService: IConfigService;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService) {
    this.configService = configService;
  }

  setupRoutes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
      res.send({
        message: this.configService.rootGreeting,
      });
    });
  };
}
