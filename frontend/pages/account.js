import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getMe } from '../api/user';
import BasicLayout from '../layouts/BasicLayout';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';
import useAuth from '../hooks/useAuth';

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      const data = await getMe(logout);
      if (!isCancelled) {
        setUser(data || null);
      }
    };
    getData();
    return () => (isCancelled = true);
    // (async () => {
    //   const data = await getMe(logout);
    //   console.log(data);
    //   setUser(data || null);
    // })();
  }, [auth]);

  if (user === undefined) return null;

  // Si no existe usuario logueado se saca de esta sección
  if (!auth && !user) {
    router.replace('/');
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
    </BasicLayout>
  );
}

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />

        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />

        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}
