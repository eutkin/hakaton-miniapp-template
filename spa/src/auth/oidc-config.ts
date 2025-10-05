import { WebStorageStateStore } from 'oidc-client-ts'

export const oidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY || 'https://your-sso-provider.com',
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID || 'your-client-id',
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || 'http://localhost/callback',
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile email',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  loadUserInfo: true,
}
