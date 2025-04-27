declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      MONGO_USER: string;
      MONGO_PASSWORD_SECRET: string;
      REGION: string;
      HTTP_PORT: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}

export {};
