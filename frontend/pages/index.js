import { useState, useEffect } from 'react';

import { Loader } from 'semantic-ui-react';

import { getLastGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout';
import ListGames from '../components/ListGames';
import Seo from '../components/Seo';

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getLastGamesApi(15);
      if (!data?.length) return setGames([]);
      setGames(data);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo
        title="Tienda de Video Juegos"
        description="Los mejores juegos para Nintendo, PlayStation y Xbox."
      />

      {!games && <Loader active>Cargando juegos...</Loader>}
      {games && games.length === 0 && (
        <div>
          <h3>No hay juegos disponibles</h3>
        </div>
      )}
      {games && games.length > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
