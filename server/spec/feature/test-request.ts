import { IApp } from '@app';
import DIContainer from '@di';
import TYPES from '@types';
import request from 'supertest';

const appBooter = DIContainer.get<IApp>(TYPES.App);

export default request(appBooter.app);
