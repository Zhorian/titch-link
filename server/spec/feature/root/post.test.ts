import { Response } from 'supertest';
import testRequest from '../test-request';

describe('/api', () => {
  let subject: Response;
  const url: string = '/api';

  describe('without a url in the body', () => {
    beforeAll(async () => {
      jest.clearAllMocks();

      subject = await (testRequest.post(url).send({}));
    });

    it('returns 400', () => {
      expect(subject.status).toBe(400);
    });

    it('returns a message of "No url provided"', () => {
      expect(subject.body).toStrictEqual({
        message: 'No url provided',
      });
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
