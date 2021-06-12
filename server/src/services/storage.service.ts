import { inject, injectable } from 'inversify';
import fs from 'fs';
import TYPES from '@types';
import { IConfigService } from '@services';

export interface IStorageService {
  save: (fileName: string, data: string) => void
  find: (fileName: string) => string | null
}

@injectable()
export class StorageService implements IStorageService {
  private readonly configService: IConfigService;

  constructor(@inject(TYPES.ConfigService) configService: IConfigService) {
    this.configService = configService;

    this.initStorageDirectory();
  }

  save = (fileName: string, data: string) => {
    const fullFilePath = this.getFullPath(fileName);
    fs.writeFileSync(fullFilePath, data);
  }

  find = (fileName: string) => {
    const fullFilePath = this.getFullPath(fileName);

    if (!fs.existsSync(fullFilePath)) {
      return null;
    }

    return fs.readFileSync(fullFilePath, 'utf8');
  }

  private initStorageDirectory = () => {
    const { storagePath } = this.configService;

    if (fs.existsSync(storagePath)) {
      return;
    }

    fs.mkdirSync(storagePath, { recursive: true });
  }

  private getFullPath = (fileName: string) => {
    const { storagePath } = this.configService;
    return `${storagePath}/${fileName}`;
  }
}
