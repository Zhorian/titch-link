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
    /**
     * @swagger
     * /:
     *  get:
     *    description: Gets the url back using the key.
     *    tags: []
     *    parameters:
     *      - in: query
     *        name: k
     *        required: true
     *        description: The key the url is stored with
     *    responses:
     *      200:
     *        description: Success
     *        schema:
     *          $ref: "#/definitions/TitchLink"
     *      400:
     *        description: No key provided
     *      404:
     *        description: No url found with key
     */
    this.router.get('/', this.controller.index);

    /**
     * @swagger
     * /:
     *  post:
     *    description: Gets the url back using the key.
     *    tags: []
     *    parameters:
     *      - in: body
     *        required: true
     *        description: Object containing the url to shrink
     *        schema:
     *          $ref: "#/definitions/TitchLink"
     *    responses:
     *      200:
     *        description: Success
     *        schema:
     *          type: object
     *          properties:
     *            url:
     *              type: string
     *      400:
     *        description: No key provided
     */
    this.router.post('/', this.controller.post);
  };
}
