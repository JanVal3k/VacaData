interface ImportMetaEnv {
    readonly TURSO_URL: string;
    readonly TURSO_AUTH_TOKEN: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly AUTH_SECRET: string;
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  