import { useState } from 'react';
import Link from 'next/link';

import { Container, Menu, Grid, Icon } from 'semantic-ui-react';

import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';

const MenuPlatforms = () => (
  <Menu>
    <Link href="/nintendo">
      {/* as permite indicar como debe comportarse el componente */}
      <Menu.Item as="a">Nintendo</Menu.Item>
    </Link>
    <Link href="/pc">
      <Menu.Item as="a">PC</Menu.Item>
    </Link>
    <Link href="/xbox">
      <Menu.Item as="a">Xbox</Menu.Item>
    </Link>
  </Menu>
);

const MenuUser = ({ onShowModal }) => (
  <Menu>
    <Menu.Item onClick={onShowModal}>
      <Icon name="user outline" />
      Mi cuenta
    </Menu.Item>
  </Menu>
);

const MenuWeb = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Iniciar sesión');

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms />
          </Grid.Column>

          <Grid.Column width={10} className="menu__right">
            <MenuUser onShowModal={onShowModal} />
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
};

export default MenuWeb;
