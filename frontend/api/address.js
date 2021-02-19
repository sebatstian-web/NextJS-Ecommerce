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

export const deleteAddressApi = async (idAddress, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/addresses/${idAddress}`;
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await authFetch(url, params, logout);

    return resp; // Eliminación correcta
  } catch (error) {
    console.log(error);
    // Se devuelve false para indicar que la dirección no se borró
    return false;
  }
};

export const updateAddressApi = async (idAddress, address, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/addresses/${idAddress}`;
    const params = {
      method: 'PUT',
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
