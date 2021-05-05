import { toast } from 'react-toastify';

import { CART } from '../utils/constants';

export const getProductsCart = () => {
  const cart = localStorage.getItem(CART);

  if (cart) {
    const products = cart.split(',');
    return products;
  } else {
    return [];
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
