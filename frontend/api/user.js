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
