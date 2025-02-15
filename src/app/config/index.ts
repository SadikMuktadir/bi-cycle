import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
