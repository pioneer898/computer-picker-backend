import { makeId } from "./custom_modules/common/makeId";

export = {
  cookieSecret: (typeof process.env.CLIENT_COOKIESECRET === 'undefined'?makeId(32):process.env.CLIENT_COOKIESECRET),
  environment: 'production',
  mongoDatabase: process.env.MONGO_DB,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PW,
  mongoDomain: process.env.MONGO_DOMAIN,
  mongoPort: process.env.MONGO_PORT
}