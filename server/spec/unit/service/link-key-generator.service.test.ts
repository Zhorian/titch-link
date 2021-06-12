import { LinkKeyGeneratorService } from '@services';

describe('LinkKeyGeneratorService', () => {
  const subject = new LinkKeyGeneratorService();

  describe('generateLinkKey', () => {
    it('returns a string of 8 characters', () => {
      const key = subject.generateLinkKey();

      expect(key.length).toBe(8);
    });

    it('returns two different keys', () => {
      const keyA = subject.generateLinkKey();
      const keyB = subject.generateLinkKey();

      expect(keyA).not.toBe(keyB);
    });
  });
});
