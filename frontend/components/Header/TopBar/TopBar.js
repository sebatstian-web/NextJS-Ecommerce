import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Container, Grid, Image, Input } from 'semantic-ui-react';

export default function TopBar() {
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
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="Logo" />
      </a>
    </Link>
  );
}

function Search() {
  const router = useRouter();
  const [searchStr, setSearchStr] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Solo cargará el componente una vez que este renderizado
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <Input
      onChange={(_, data) => setSearchStr(data.value)}
      value={router.query.query || searchStr} // Router para mantener la referencia del primer valor escrito
      id="search-game"
      icon={{ name: 'search' }}
    />
  );
}
