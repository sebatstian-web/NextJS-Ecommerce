import { useState, useEffect } from 'react';

import { Table, Image, Icon } from 'semantic-ui-react';

import useCart from '../../../hooks/useCart';

export default function SummaryCart({ products, setReloadCard, reloadCard }) {
  const { removeProductCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (products) {
      let price = 0;
      products.forEach((product) => (price += product.price));
      setTotalPrice(price);
    }
  }, [reloadCard, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCard(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products &&
              products.map((product) => (
                <Table.Row key={product.id} className="summary-cart__product">
                  <Table.Cell>
                    <Icon
                      onClick={() => removeProduct(product.url)}
                      name="close"
                      link
                    />
                    <Image src={product.poster.url} alt={product.title} />
                    {product.title}
                  </Table.Cell>
                  <Table.Cell>{product.platform.title}</Table.Cell>
                  <Table.Cell>$ {product.price}</Table.Cell>
                </Table.Row>
              ))}

            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="1">Total:</Table.Cell>
              <Table.Cell className="total-price">$ {totalPrice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
