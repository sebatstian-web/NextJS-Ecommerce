import { useState, useEffect } from 'react';

import { Grid, Image, Icon, Button } from 'semantic-ui-react';

import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from '../../../api/favorite';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';

export default function HeaderGame({ game }) {
  const { title, poster } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={11}>
        <InfoGame game={game} />
      </Grid.Column>
    </Grid>
  );
}

function InfoGame({ game }) {
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { title, summary, price, discount, id, url } = game;

  useEffect(() => {
    (async () => {
      if (auth) {
        const resp = await isFavoriteApi(auth.idUser, id, logout);
        if (resp.length > 0) setIsFavorite(true);
        else setIsFavorite(false);
      }
      setReloadFavorite(false);
    })();
  }, [game, reloadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  const removeFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? 'heart' : 'heart outline'}
          className={isFavorite ? 'like' : null}
          onClick={isFavorite ? removeFavorite : addFavorite}
          link
        />
      </div>
      <div className="header-game__delivery">Entrega entre 24/48 horas</div>
      <div className="header-game__summary">{summary}</div>
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta: ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>${price - Math.floor(price * discount) / 100}</p>
          </div>
        </div>
        <Button
          onClick={() => addProductCart(url)}
          className="header-game__buy-btn"
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
