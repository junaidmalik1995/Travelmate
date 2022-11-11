export default {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_SSL: process.env.DB_SSL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SANDS_API_TOKEN: process.env.SANDS_API_TOKEN,
  AWS_REGION: process.env.AWS_REGION,
  AWS_COGNITO_SECRET_HASH: process.env.AWS_COGNITO_SECRET_HASH,
  AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MEILI_HOST: process.env.MEILI_HOST,
  MEILI_PORT: process.env.MEILI_PORT,
  SENTRY_DNS: process.env.SENTRY_DNS,
  MAX_REQUEST_PER_IP: process.env.MAX_REQUEST_PER_IP,
  REQUEST_WINDOW_SEC: process.env.REQUEST_WINDOW_SEC,
};