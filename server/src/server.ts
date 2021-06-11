import 'module-alias/register';
import { IApp } from '@app';
import 'reflect-metadata';
import DIContainer from './di';
import { TYPES } from './types';

const app = DIContainer.get<IApp>(TYPES.App);

app.listen();
