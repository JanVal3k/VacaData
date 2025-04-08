interface ImportMetaEnv {
    readonly TURSO_URL: string;
    readonly TURSO_AUTH_TOKEN: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly AUTH_SECRET: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  