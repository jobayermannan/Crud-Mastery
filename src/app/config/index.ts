import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  data_base_url: process.env.DATA_BASE_URL,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS
};
