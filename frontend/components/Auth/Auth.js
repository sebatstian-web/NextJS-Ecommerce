import { useState } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = ({ onCloseModal, setTitleModal }) => {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal('Iniciar sesión');
    setShowLogin(true);
  };

  const showRegisterForm = () => {
    setTitleModal('Crear nueva cuenta');
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
};

export default Auth;
