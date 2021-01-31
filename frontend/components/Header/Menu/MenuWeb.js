import Link from 'next/link';

import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react';

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

const MenuUser = () => (
  <Menu>
    <Menu.Item>
      <Icon name="user outline" />
      Mi cuenta
    </Menu.Item>
  </Menu>
);

const MenuWeb = () => {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms />
          </Grid.Column>

          <Grid.Column width={10} className="menu__right">
            <MenuUser />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default MenuWeb;
