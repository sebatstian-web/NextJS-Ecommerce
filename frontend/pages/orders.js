import { useState, useEffect } from 'react';

import { Grid } from 'semantic-ui-react';

import { getOrdersApi } from '../api/order';
import BasicLayout from '../layouts/BasicLayout';
import Order from '../components/Orders/Order/Order';
import useAuth from '../hooks/useAuth';

export default function Orders() {
  const { auth, logout } = useAuth();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getOrdersApi(auth.idUser, logout);
      setOrders(data || []);
    })();
  }, []);

  console.log(orders);

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {orders && orders.length === 0 ? (
            <h2 style={{ textAlign: 'center' }}>
              Aún no has realizado nínguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList({ orders }) {
  return (
    <Grid>
      {orders &&
        orders.map((order) => (
          <Grid.Column key={order._id} mobile={16} tablet={6} computer={8}>
            <Order order={order} />
          </Grid.Column>
        ))}
    </Grid>
  );
}
