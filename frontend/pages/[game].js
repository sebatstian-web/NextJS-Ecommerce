import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getGameByUrlApi } from '../api/game';
import BasicLayout from '../layouts/BasicLayout';
import HeaderGame from '../components/Game/HeaderGame';
import TabsGame from '../components/Game/TabsGame';
import Seo from '../components/Seo';

export default function Game() {
  const [game, setGame] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getGameByUrlApi(query.game);
      if (data) setGame(data);
    })();
  }, [query]);

  if (!game) return null;

  return (
    <BasicLayout className="game">
      <Seo title={game.title} description={game.summary} />

      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
