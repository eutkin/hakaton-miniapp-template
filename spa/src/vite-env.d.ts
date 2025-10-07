/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OIDC_AUTHORITY: string;
    readonly VITE_OIDC_CLIENT_ID: string;
    readonly VITE_OIDC_REDIRECT_URI: string;
    readonly VITE_FARO_COLLECT_URL: string;
    readonly VITE_FARO_APP_NAME: string;
    readonly VITE_FARO_APP_VERSION: string;
    // Добавь другие VITE_* переменные по мере необходимости
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}