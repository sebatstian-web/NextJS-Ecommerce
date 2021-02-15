import { getStorageToken, hasExpiredToken } from '../api/token';

export const authFetch = async (url, params, logout) => {
  const token = getStorageToken();

  if (!token) {
    logout(); // Usuario no logueado
  } else {
    if (hasExpiredToken(token)) {
      logout(); // Token expirado
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const resp = await fetch(url, paramsTemp);
        const data = await resp.json();

        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};
