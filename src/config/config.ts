import * as dotenv from "dotenv";
import { resolve } from "path";
import * as Joi from "joi";

dotenv.config({
  path: resolve(__dirname, "../../.env"),
});

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  PORT: Joi.string().required().default("4000"),
  SERVER_URL: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required().default("*"),
  ACCESS_TOKEN_SECRET: Joi.string().min(8).required(),
  ACCESS_TOKEN_EXPIRE: Joi.string().required().default("20m"),
  REFRESH_TOKEN_SECRET: Joi.string().min(8).required(),
  REFRESH_TOKEN_EXPIRE: Joi.string().required().default("1d"),
  REGISTER_TOKEN_SECRET: Joi.string().required().default("1h"),
  DATABASE_URL: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  TWILIO_ACC: Joi.string().required(),
  TWILIO_TOKEN: Joi.string().required(),
  TWILIO_SERVICE: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  FACEBOOK_CLIENT_ID: Joi.string().required(),
  FACEBOOK_CLIENT_SECRET: Joi.string().required(),
  FACEBOOK_CALLBACK_URL: Joi.string().required(),
});

const { value: validatedEnv, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) {
  throw new Error(
    `Environment variable validation error: \n${error.details
      .map((detail) => detail.message)
      .join("\n")}`
  );
}

const config = {
  node_env: validatedEnv.NODE_ENV,
  server: {
    port: validatedEnv.PORT,
    url: validatedEnv.SERVER_URL,
  },
  cors: {
    cors_origin: validatedEnv.CORS_ORIGIN,
  },
  jwt: {
    access_token: {
      secret: validatedEnv.ACCESS_TOKEN_SECRET,
      expire: validatedEnv.ACCESS_TOKEN_EXPIRE,
    },
    refresh_token: {
      secret: validatedEnv.REFRESH_TOKEN_SECRET,
      expire: validatedEnv.REFRESH_TOKEN_EXPIRE,
    },
    register_token: {
      secret: validatedEnv.REGISTER_TOKEN_SECRET,
    },
  },
  database: {
    username: validatedEnv.DB_USER,
    password: validatedEnv.DB_PASSWORD,
    database: validatedEnv.DB_DATABASE,
    port: validatedEnv.DB_PORT,
    host: validatedEnv.DB_HOST,
  },
  sms: {
    acc: validatedEnv.TWILIO_ACC,
    token: validatedEnv.TWILIO_TOKEN,
    service: validatedEnv.TWILIO_SERVICE,
  },
  thirdParty: {
    google: {
      client_id: validatedEnv.GOOGLE_CLIENT_ID,
      client_secret: validatedEnv.GOOGLE_CLIENT_SECRET,
      callback_url: validatedEnv.GOOGLE_CALLBACK_URL,
    },
    facebook: {
      client_id: validatedEnv.FACEBOOK_CLIENT_ID,
      client_secret: validatedEnv.FACEBOOK_CLIENT_SECRET,
      callback_url: validatedEnv.FACEBOOK_CALLBACK_URL,
    },
  },
} as const;

export default config;
