export const getPlatformsApi = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/platforms?_sort=position:ASC`;
    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
