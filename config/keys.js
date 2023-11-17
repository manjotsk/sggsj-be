require("dotenv").config();
module.exports = {
  host: {
    DB_CONNECT: process.env.DB_CONNECT,
    port: process.env.PORT,
  },
  secretkey: {
    SecureKey: process.env.SECRET_KEY,
  },
};
