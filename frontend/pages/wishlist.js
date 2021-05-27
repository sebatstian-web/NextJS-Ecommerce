import { useState, useEffect } from 'react';

import { Loader } from 'semantic-ui-react';

import { getFavoritesApi } from '../api/favorite';
import BasicLayout from '../layouts/BasicLayout';
import useAuth from '../hooks/useAuth';
import ListGames from '../components/ListGames';

export default function Wishlist() {
  const { auth, logout } = useAuth();
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await getFavoritesApi(auth.idUser, logout);
      if (resp.length > 0) {
        const gamesList = resp.map(({ game }) => game);
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="whishlist">
      <div className="whishlist__block">
        <div className="title">Lista de favoritos</div>
        <div className="data">
          {!games && <Loader active>Cargando lista...</Loader>}
          {games && games?.length === 0 && (
            <div>
              <h3>No hay juegos en la lista de favoritos</h3>
            </div>
          )}
          {games?.length > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
