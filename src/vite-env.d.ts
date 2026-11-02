/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_TIMEOUT_MS?: string;
  /** "true" shows draft placeholders in a production build (see src/drafts.ts). */
  readonly VITE_SHOW_PLACEHOLDERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
