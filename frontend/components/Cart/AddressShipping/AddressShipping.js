import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Grid } from 'semantic-ui-react';
import classNames from 'classnames';

import { getAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressShipping({ setAddress }) {
  const { auth, logout } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getAddressApi(auth.idUser, logout);
      setAddresses(data || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envío</div>
      <div className="data">
        {addresses && addresses.length !== 0 ? (
          <Grid>
            {addresses.map((address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress} // Viene de pages/cart.js
                />
              </Grid.Column>
            ))}
          </Grid>
        ) : (
          <>
            <h3>No tiene nínguna dirección guardada</h3>
            <Link href="/account">
              <a className="ui button">Agregar dirección</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function Address({ address, addressActive, setAddressActive, setAddress }) {
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      onClick={changeAddress}
      className={classNames('address', {
        active: addressActive === address._id,
      })}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}
      </p>
      <p>{address.postalCode}</p>
      <p>{address.phone}</p>
    </div>
  );
}
