import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@types';
import { IPingRouter, IRootRouter } from '@routing';

export interface IRouteService {
  setupRoutes: (app: Express) => void;
}

@injectable()
export class RouteService implements IRouteService {
  private readonly pingRouter: IPingRouter;

  private readonly rootRouter: IRootRouter;

  constructor(
    @inject(TYPES.PingRouter) pingRouter: IPingRouter,
    @inject(TYPES.RootRouter) rootRouter: IRootRouter,
  ) {
    this.pingRouter = pingRouter;
    this.rootRouter = rootRouter;
  }

  setupRoutes = (app: Express) => {
    app.use('/api', this.rootRouter.router);
    app.use('/api/ping', this.pingRouter.router);
  };
}
