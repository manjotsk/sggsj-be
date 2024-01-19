import dotenv from 'dotenv';

dotenv.config();

export default {
  host: {
    DB_CONNECT: process.env.DB_CONNECT,
    port: process.env.PORT
  },
  secretkey: {
    SecureKey: process.env.SECRET_KEY
  }
};