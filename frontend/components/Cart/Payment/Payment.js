import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import FormPayment from './FormPayment/FormPayment';

// Estableciendo conexión con Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN);

export default function Payment({ products, address }) {
  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
