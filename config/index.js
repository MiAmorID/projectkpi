
const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

let config = {
  port: parseInt(process.env.PORT, 10),
  api : {
      prefix : process.env.PREFIX || "/"
  },
  mongodb : {
    url : process.env.MONGO_URL,
    user : process.env.MONGO_USER,
    pass : process.env.MONGO_PASS,
    port : process.env.MONGO_PORT,
    collection : process.env.MONGO_COLLECTION,
  },
  gitlab: {
    baseurl: "https://gitlab.com/api/v4",
    token: "glpat-cvppuvi75js6C_wEXZAn"
  }
};

module.exports = config;
