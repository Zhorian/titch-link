import { Response } from 'supertest';
import fs from 'fs';
import StorageHelper from '../../helpers/storage.helper';
import testRequest from '../test-request';

const storageHelper = new StorageHelper();

describe('/api', () => {
  let subject: Response;

  describe('without id', () => {
    const url: string = '/api';

    beforeAll(async () => {
      jest.clearAllMocks();
      storageHelper.purgeStorage();
      subject = await testRequest.get(url);
    });

    it('returns 400', () => {
      expect(subject.status).toBe(400);
    });

    it('returns a message of "No key provided"', () => {
      expect(subject.body).toStrictEqual({
        message: 'No key provided',
      });
    });
  });

  describe('with invalid id', () => {
    const url: string = '/api?k=ijklmnop';

    beforeAll(async () => {
      jest.clearAllMocks();
      storageHelper.purgeStorage();
      subject = await testRequest.get(url);
    });

    it('returns 404', () => {
      expect(subject.status).toBe(404);
    });

    it('returns a message of "not found"', () => {
      expect(subject.body).toStrictEqual({
        message: 'Not found',
      });
    });
  });

  describe('with id', () => {
    const key = 'qrstuvwx';
    const content = { url: 'https://en.wikipedia.org/wiki/Super_Metroid' };
    const url: string = `/api?k=${key}`;

    beforeAll(async () => {
      jest.clearAllMocks();
      storageHelper.purgeStorage();
      fs.writeFileSync(`${storageHelper.DIRECTORY}/${key}.json`, JSON.stringify(content));
      subject = await testRequest.get(url);
    });

    it('returns 200', () => {
      expect(subject.status).toBe(200);
    });

    it('returns the id', () => {
      expect(subject.body).toStrictEqual(content);
    });
  });
});
