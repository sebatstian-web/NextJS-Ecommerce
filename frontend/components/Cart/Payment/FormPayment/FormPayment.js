import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'semantic-ui-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

import { paymentCartApi } from '../../../../api/cart';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';

export default function FormPayment({ products, address }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(card);

    if (error) {
      setLoading(false);
      return toast.error(error.message);
    }

    const resp = await paymentCartApi(
      token,
      products,
      auth.idUser,
      address,
      logout
    );

    if (resp.length > 0) {
      removeAllProductsCart();
      toast.success('Pedido completado exitosamente');
      router.push('/orders');
    } else {
      toast.error(
        'Ocurrio un error al procesar el pedido, vuelva a intentar por favor'
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-payment">
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pagar
      </Button>
    </form>
  );
}
