import 'reflect-metadata';
import request, { Response } from 'supertest';
import { IApp } from '@app';
import DIContainer from '@di';
import { TYPES } from '@types';

describe('/api', () => {
  let subject: Response;

  beforeAll(async () => {
    jest.clearAllMocks();

    const appInitialiser = DIContainer.get<IApp>(TYPES.App);

    subject = await request(appInitialiser.app).get('/api');
  });

  it('returns 200', () => {
    expect(subject.status).toBe(200);
  });

  it('returns an object with a message property', () => {
    expect(subject.body).toStrictEqual({
      message: 'Greetings from the config service! Now with aliases!!!',
    });
  });
});
