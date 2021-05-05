import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { setStorageToken, getStorageToken, removeToken } from '../api/token';
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
} from '../api/cart';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/global.scss';
import 'semantic-ui-css/semantic.min.css';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCard, setReloadCard] = useState(false);

  useEffect(() => {
    const token = getStorageToken();

    if (token) {
      const { id } = jwt_decode(token);
      setAuth({
        token,
        idUser: id,
      });
    } else {
      // Si no existe el token en el localStorage
      setAuth(null);
    }

    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductsCart(countProductsCart);
    setReloadCard(false);
  }, [reloadCard, auth]);

  const login = (token) => {
    const { id } = jwt_decode(token);
    setStorageToken(token);
    setAuth({
      token,
      idUser: id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push('/');
    }
  };

  // Recordar el estado del usuario loqueado mientras no hayan cambios
  // en los datos del usuario logueado
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProduct = (productId) => {
    const token = getStorageToken();

    if (token) {
      addProductCart(productId);
      setReloadCard(true);
    } else {
      toast.warning('Para comprar debe iniciar sesión');
    }
  };

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: addProduct,
      getProductsCart,
      removeProductCart: () => null,
      removeAllProductsCart: () => null,
    }),
    [totalProductsCart]
  );

  // Aun no se ha comprobado si el usuario esta logueado
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          rtl={false}
          pauseOnFocusLoss={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
