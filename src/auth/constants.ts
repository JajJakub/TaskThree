import * as process from 'process';
require('dotenv').config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
