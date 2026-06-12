export const AUTH_COOKIE = 'crm_auth';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin';

export function isValidCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
