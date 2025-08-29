declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WEBVIEW: string;
    }
  }
}
