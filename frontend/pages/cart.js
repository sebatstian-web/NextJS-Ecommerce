import { useState, useEffect } from 'react';

import { getGameByUrlApi } from '../api/game';
import AddressShipping from '../components/Cart/AddressShipping/AddressShipping';
import BasicLayout from '../layouts/BasicLayout';
import Payment from '../components/Cart/Payment/Payment';
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import useCart from '../hooks/useCart';

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return products ? <FullCart products={products} /> : <EmptyCart />;
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null);
  const [reloadCard, setReloadCard] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let productsTemp = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCard(false);
  }, [reloadCard]);

  return (
    <BasicLayout>
      <SummaryCart
        products={productsData}
        reloadCard={reloadCard}
        setReloadCard={setReloadCard}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}

function EmptyCart() {
  return (
    <BasicLayout>
      <h2 className="empty-card">No hay productos en el carrito de compras</h2>
    </BasicLayout>
  );
}
