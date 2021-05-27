import { authFetch } from '../utils/fetch';

export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favorites?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const data = await isFavoriteApi(idUser, idGame, logout);

    if (data?.length === 0) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/favorites`;
      const params = {
        method: 'POST',
        body: JSON.stringify({ user: idUser, game: idGame }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const resp = await authFetch(url, params, logout);
      return resp;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const data = await isFavoriteApi(idUser, idGame, logout);

    if (data?.length > 0) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/favorites/${data[0]?._id}`;
      const params = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const resp = await authFetch(url, params, logout);
      return resp;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoritesApi(idUser, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/favorites?user=${idUser}`;
    const resp = await authFetch(url, null, logout);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
}
