import { useContext } from 'react';

import AuthContext from '../context/AuthContext';

// Sacar todos los datos del contexto de auth y devolverlos
// mediante una función
const useAuth = () => useContext(AuthContext);

export default useAuth;
