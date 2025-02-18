import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
};
