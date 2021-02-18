import { authFetch } from '../utils/fetch';

export const createAddressApi = async (address, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/addresses`;
    const params = {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await authFetch(url, params, logout);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressApi = async (idUser, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/addresses?user=${idUser}`;
    const data = await authFetch(url, null, logout);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
