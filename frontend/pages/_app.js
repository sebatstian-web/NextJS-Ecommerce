import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { setStorageToken, getStorageToken, removeToken } from '../api/token';
import AuthContext from '../context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';
import 'semantic-ui-css/semantic.min.css';

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

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

  // Aun no se ha comprobado si el usuario esta logueado
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
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
    </AuthContext.Provider>
  );
}
