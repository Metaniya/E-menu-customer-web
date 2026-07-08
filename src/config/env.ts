export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  appName: 'E-MENU',
  appVersion: '1.0.0',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
