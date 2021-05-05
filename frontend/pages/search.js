import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Loader } from 'semantic-ui-react';

import { searchGamesApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout';
import ListGames from '../components/ListGames';

export default function search() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);

  useEffect(() => {
    // Mantener el foco en el input desde el componente TopBar
    document.getElementById('search-game').focus();
  }, []);

  useEffect(() => {
    (async () => {
      setGames(null);
      if (query.query?.length > 0) {
        const resp = await searchGamesApi(query.query);
        if (resp.length > 0) setGames(resp);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!games && <Loader active>Buscando juegos...</Loader>}
      {games && games.length === 0 && (
        <div>
          <h3>No se encontraron juegos</h3>
        </div>
      )}
      {games?.length > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
