import { Response } from 'supertest';
import testRequest from '../test-request';

describe('/api', () => {
  let subject: Response;
  const url: string = '/api';

  describe('without a body', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      subject = await testRequest.post(url);
    });

    it('returns 500', () => {
      expect(subject.status).toBe(500);
    });
  });

  describe('without a url in the body', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      subject = await (testRequest.post(url).send({}));
    });

    it('returns 500', () => {
      expect(subject.status).toBe(500);
    });
  });

  describe('with a url in the body', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      subject = await (testRequest.post(url).send({ url: 'some url' }));
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
});
