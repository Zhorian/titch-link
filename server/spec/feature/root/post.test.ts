import { Response } from 'supertest';
import testRequest from '../test-request';

describe('/api', () => {
  let subject: Response;
  const url: string = '/api';

  beforeAll(async () => {
    jest.clearAllMocks();

    subject = await testRequest.post(url);
  });

  it('returns 200', () => {
    expect(subject.status).toBe(200);
  });

  it('returns an object the titched url', () => {
    expect(subject.body).toStrictEqual({
      url: 'https://titchlink.com/abcdefgh',
    });
  });
});
