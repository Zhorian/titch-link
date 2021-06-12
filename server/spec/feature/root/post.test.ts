import { Response } from 'supertest';
import fs from 'fs';
import StorageHelper from '../../helpers/storage.helper';
import testRequest from '../test-request';

const storageHelper = new StorageHelper();

describe('/api', () => {
  let subject: Response;
  const url: string = '/api';

  describe('without a url in the body', () => {
    beforeEach(async () => {
      jest.clearAllMocks();

      storageHelper.purgeStorage();
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
    beforeEach(async () => {
      jest.clearAllMocks();

      storageHelper.purgeStorage();
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

    it('saves the url in storage', () => {
      const fullFilePath = `${storageHelper.DIRECTORY}/abcdefgh.json`;
      expect(fs.existsSync(fullFilePath)).toBe(true);

      const fileData = fs.readFileSync(fullFilePath, 'utf8');
      expect(JSON.parse(fileData)).toStrictEqual({ url: 'some url' });
    });
  });
});
