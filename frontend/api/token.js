import jwt_decode from 'jwt-decode';

import { TOKEN } from '../utils/constants';

export const setStorageToken = (token) => localStorage.setItem(TOKEN, token);

export const getStorageToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);

// Verificar si el token esta expirado
export const hasExpiredToken = (token) => {
  const { exp } = jwt_decode(token);
  const expireDate = exp * 1000;
  const currentDate = new Date().getTime();

  // Si el token está expirado
  if (currentDate > expireDate) return true;

  return false;
};
