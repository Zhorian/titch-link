import { Router } from 'express';
import { IRootController } from '@controllers';
import { inject, injectable } from 'inversify';
import { TYPES } from '@types';

export interface IRootRouter {
  readonly router: Router;
}

@injectable()
export class RootRouter {
  private readonly controller: IRootController;

  readonly router: Router;

  constructor(@inject(TYPES.RootController) controller: IRootController) {
    this.controller = controller;
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter = () => {
    this.router.get('/', this.controller.index);
    this.router.post('/', this.controller.post);
  };
}
