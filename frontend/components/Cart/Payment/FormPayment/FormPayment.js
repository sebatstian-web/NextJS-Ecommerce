import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'semantic-ui-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

export default function FormPayment({ products, address }) {
  const stripe = useStripe();
  const elements = useElements();
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

    console.log(token);

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
