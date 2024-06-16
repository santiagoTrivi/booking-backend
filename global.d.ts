namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      DB_URI: string;
      DEVELOPEMENT_DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }