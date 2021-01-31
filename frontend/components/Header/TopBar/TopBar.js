import Link from 'next/link';

import { Container, Grid, Image, Input } from 'semantic-ui-react';

const Logo = () => (
  <Link href="/">
    <a>
      <Image src="/logo.png" alt="Logo" />
    </a>
  </Link>
);

const Search = () => <Input id="search-game" icon={{ name: 'search' }} />;

const TopBar = () => {
  return (
    <div className="top-bar">
      <Container>
        <Grid>
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>

          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default TopBar;
