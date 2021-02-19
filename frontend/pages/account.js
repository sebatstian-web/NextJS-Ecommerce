import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Icon } from 'semantic-ui-react';

import { getMe } from '../api/user';
import AddressForm from '../components/Account/AddressForm';
import BasicLayout from '../layouts/BasicLayout';
import BasicModal from '../components/Modal/BasicModal';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangeNameForm from '../components/Account/ChangeNameForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm';
import ListsAddress from '../components/Account/ListsAddress';
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
      <Addresses />
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

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [formModal, setFormModal] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);

  const openModal = (title) => {
    setTitle(title);
    setShowModal(true);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddress={setReloadAddress}
      />
    );
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon
          onClick={() => openModal('Agregar nueva dirección')}
          name="plus"
          link
        />
      </div>
      <div className="data">
        <ListsAddress
          reloadAddress={reloadAddress}
          setReloadAddress={setReloadAddress}
        />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={title}>
        {formModal}
      </BasicModal>
    </div>
  );
}
