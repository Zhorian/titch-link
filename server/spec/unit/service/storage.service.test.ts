import { IConfigService, StorageService } from '@services';
import fs from 'fs';
import { StorageHelper } from '../../helpers/storage.helper';

const storageHelper = new StorageHelper();

describe('StorageService', () => {
  const config: IConfigService = {
    rootGreeting: '',
    port: 0,
    nodeEnvironment: 'test',
    serverHost: '',
    storagePath: storageHelper.DIRECTORY,
  };
  const subject = new StorageService(config);

  beforeEach(() => {
    storageHelper.purgeStorage();
  });

  describe('save', () => {
    const fileName = 'my-file.json';
    const fullFilePath = `${storageHelper.DIRECTORY}/${fileName}`;
    const content = { foo: 'bar' };

    beforeEach(() => {
      subject.save(fileName, JSON.stringify(content));
    });

    it('finds the file', () => {
      expect(fs.existsSync(fullFilePath)).toBe(true);
    });

    it('has the correct content', () => {
      const fileData = fs.readFileSync(fullFilePath, 'utf8');
      expect(JSON.parse(fileData)).toStrictEqual(content);
    });
  });

  describe('find', () => {
    describe("doesn't find file", () => {
      let val: any;

      beforeEach(() => {
        val = subject.find('my-file.json');
      });

      it('returns null', () => {
        expect(val).toBeNull();
      });
    });

    describe('does find file', () => {
      const fileName = 'some-file.json';
      const fullFilePath = `${storageHelper.DIRECTORY}/${fileName}`;
      const content = { ping: 'pong' };
      let val: any;

      beforeEach(() => {
        fs.writeFileSync(fullFilePath, JSON.stringify(content));
        val = subject.find(fileName);
      });

      it('returns the content', () => {
        expect(JSON.parse(val)).toStrictEqual(content);
      });
    });
  });
});
