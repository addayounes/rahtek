declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: "production" | "development" | "test";
    readonly PORT: string;
    readonly SERVER_URL: string;
    readonly CORS_ORIGIN: string;
    readonly ACCESS_TOKEN_SECRET: string;
    readonly ACCESS_TOKEN_EXPIRE: string;
    readonly REFRESH_TOKEN_SECRET: string;
    readonly REFRESH_TOKEN_EXPIRE: string;
    readonly REGISTER_TOKEN_SECRET: string;
    readonly DATABASE_URL: string;
    readonly DB_USER: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly DB_PORT: string;
    readonly DB_HOST: string;
    readonly TWILIO_ACC: string;
    readonly TWILIO_TOKEN: string;
    readonly TWILIO_SERVICE: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly GOOGLE_CALLBACK_URL: string;
    readonly FACEBOOK_CLIENT_ID: string;
    readonly FACEBOOK_CLIENT_SECRET: string;
    readonly FACEBOOK_CALLBACK_URL: string;
    readonly FIREBASE_TYPE: string;
    readonly FIREBASE_PROJECT_ID: string;
    readonly FIREBASE_PRIVATE_KEY_ID: string;
    readonly FIREBASE_PRIVATE_KEY: string;
    readonly FIREBASE_CLIENT_EMAIL: string;
    readonly FIREBASE_CLIENT_ID: string;
    readonly FIREBASE_AUTH_URI: string;
    readonly FIREBASE_TOKEN_URI: string;
    readonly FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
    readonly FIREBASE_CLIENT_X509_CERT_URL: string;
    readonly FIREBASE_UNIVERSE_DOMAIN: string;
    readonly FIREBASE_STORAGE_BUCKET: string;
  }
}
