declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      MONGO_USER: string;
      MONGO_PASSWORD_SECRET: string;
      REGION: string;
      HTTP_PORT: string;
    }
  }
}

export {};
