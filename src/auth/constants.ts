import * as process from 'process';
import { NotFoundException } from '@nestjs/common';
require('dotenv').config();

function ensureEnvVariable(name: string): string {
  if (!(name in process.env))
    throw new NotFoundException(`.env variable ${name} not found`);
  else return process.env[name];
}

export const jwtConstants = {
  secret: ensureEnvVariable('JWT_SECRET'),
};
