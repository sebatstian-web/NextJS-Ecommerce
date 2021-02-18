import { useState, useEffect } from 'react';

import { getAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function ListsAddress() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await getAddressApi(auth.idUser);
      setAddresses(data || []);
    })();
  }, []);

  console.log(addresses);

  return <div className="list-address">listado de direcciones</div>;
}
