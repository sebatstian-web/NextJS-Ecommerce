import { useState, useEffect } from 'react';

import { map, size } from 'lodash';
import { Grid, Button } from 'semantic-ui-react';

import { getAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function ListsAddress({ reloadAddress, setReloadAddress }) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getAddressApi(auth.idUser, logout);
      setAddresses(data || []);
      setReloadAddress(false); // Volviendo la recarga a su estado original
    })();
  }, [reloadAddress]);

  // Solo se mostrará el componente cuando se tenga una respuesta desde la API
  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) !== 0 ? (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address address={address} />
            </Grid.Column>
          ))}
        </Grid>
      ) : (
        <h3>No tiene direcciones guardadas.</h3>
      )}
    </div>
  );
}

function Address({ address }) {
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}
      </p>
      <p>{address.postalCode}</p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button primary>Editar</Button>
        <Button>Eliminar</Button>
      </div>
    </div>
  );
}
