import { authFetch } from '../utils/fetch';

export const registerUser = async (formData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`;
    const params = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(url, params);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUser = async (formData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/local`;
    const params = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(url, params);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resetPasswordUser = async (email) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`;
    const params = {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(url, params);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMe = async (logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
    const data = await authFetch(url, null, logout);

    return data ? data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (idUser, formData, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(formData),
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

export const updateUserEmail = async (idUser, email, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify({ email }),
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

export const updateUserPassword = async (idUser, password, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${idUser}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify({ password }),
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
