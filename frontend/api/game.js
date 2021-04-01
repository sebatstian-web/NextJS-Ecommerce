export const getLastGamesApi = async (limit) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/games?_limit=${limit}&_sort=createdAt:DESC`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesPlatformApi = async (platform, limit, start) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/games?platform.url=${platform}&_limit=${limit}&_start=${start}&_sort=createdAt:DESC`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTotalGamesPlatformApi = async (platform) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/games/count?platform.url=${platform}`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGameByUrlApi = async (path) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/games?url=${path}`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data[0]; // Devolviendo el primer elemento
  } catch (error) {
    console.log(error);
    return null;
  }
};
