import { Stripe, loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY =
  "pk_test_51NA61ZCxOnBDKKh90pGQ4t1hs93Cv3yWhKeyyIlIcddjnwW932QYLlQeGzvVtJW1cyrsoEZPOsDM4Vs0Zk4kKiNJ00H4c03LAk";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export default getStripe;
