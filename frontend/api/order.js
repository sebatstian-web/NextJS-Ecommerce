import { authFetch } from '../utils/fetch';

export const getOrdersApi = async (idUser, logout) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders?_sort=createdAt:DESC&user=${idUser}`;
    const data = await authFetch(url, null, logout);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
