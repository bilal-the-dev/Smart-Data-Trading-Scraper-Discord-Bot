declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      DISCORD_WEBHOOK_URLS: string;
      DISCORD_ERROR_WEBHOOK_URL: string;
      USER_AGENT: string;
      SMART_DATA_TRADING_URL: string;
      SMART_DATA_REMEMBER_COOKIE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
