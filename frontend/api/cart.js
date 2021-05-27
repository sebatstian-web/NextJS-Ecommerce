import { toast } from 'react-toastify';

import { CART } from '../utils/constants';
import { authFetch } from '../utils/fetch';

export const getProductsCart = () => {
  const cart = localStorage.getItem(CART);

  if (cart) {
    const products = cart.split(',');
    return products;
  } else {
    return null;
  }
};

export const addProductCart = (product) => {
  const cart = getProductsCart();

  // Si hay productos
  if (cart) {
    const productExists = cart.includes(product);

    if (productExists) {
      toast.warning('Este producto ya está en el carrito');
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success('Producto agregado al carrito');
    }
  } else {
    // Si no hay productos
    localStorage.setItem(CART, product);
    toast.success('Producto agregado al carrito');
  }
};

export const countProductsCart = () => {
  const cart = getProductsCart();

  if (cart) {
    return cart.length;
  } else {
    return 0;
  }
};

export const removeProductCart = (product) => {
  const cart = getProductsCart();

  if (cart) {
    const productsFilter = cart.filter((item) => item !== product);
    localStorage.setItem(CART, productsFilter);
  }
};

export const paymentCartApi = async (
  token,
  products,
  idUser,
  address,
  logout
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

    delete address.user;

    const params = {
      method: 'POST',
      body: JSON.stringify({
        token,
        products,
        idUser,
        address,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = authFetch(url, params, logout);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeAllProductsCart = () => {
  localStorage.removeItem(CART);
};
