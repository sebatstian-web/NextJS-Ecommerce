import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Container, Menu, Grid, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

import { getMe } from '../../../api/user';
import { getPlatformsApi } from '../../../api/platform';
import Auth from '../../Auth';
import BasicModal from '../../Modal/BasicModal';
import useAuth from '../../../hooks/useAuth';

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Iniciar sesión');
  const [platforms, setPlatforms] = useState(null);
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    let isCancelled = false;

    const getData = async () => {
      const data = await getMe(logout);
      if (!isCancelled) {
        setUser(data);
      }
    };

    getData();
    return () => (isCancelled = true);
  }, [auth]);

  useEffect(() => {
    (async () => {
      const data = await getPlatformsApi();
      setPlatforms(data || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms platforms={platforms} />
          </Grid.Column>

          <Grid.Column width={10} className="menu__right">
            <MenuUser user={user} logout={logout} onShowModal={onShowModal} />
          </Grid.Column>
        </Grid>
      </Container>

      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms({ platforms }) {
  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link key={platform.id} href={`/games/${platform.url}`}>
          {/* as permite indicar como debe comportarse el componente */}
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuUser({ user, logout, onShowModal }) {
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>

          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart" />
              Favoritos
            </Menu.Item>
          </Link>

          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>

          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
