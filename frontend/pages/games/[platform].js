import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Loader } from 'semantic-ui-react';

import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game';
import BasicLayout from '../../layouts/BasicLayout';
import ListGames from '../../components/ListGames';
import Pagination from '../../components/Pagination';

const limit = 15;

export default function Platform() {
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  const { query } = useRouter();

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    return currentPage * limit - limit;
  };

  useEffect(() => {
    (async () => {
      setGames(null);
      if (query.platform) {
        const data = await getGamesPlatformApi(
          query.platform,
          limit,
          getStartItem()
        );
        if (!data.length) return setGames([]);
        setGames(data);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      setTotalGames(null);
      const data = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(data);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando juegos...</Loader>}
      {games && games?.length === 0 && (
        <div>
          <h3>No hay juegos para la plataforma: {query.platform}</h3>
        </div>
      )}
      {games?.length > 0 && <ListGames games={games} />}

      {/* Paginación */}
      {totalGames && (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limit={limit}
        />
      )}
    </BasicLayout>
  );
}
