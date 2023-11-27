declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      JWT: string;
      HOST: string;
      PORT: number;
    }
  }
}

export { };
