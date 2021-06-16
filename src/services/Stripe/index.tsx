import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// STRIPE_API_KEY should be present, hence we must tell typescript to trust it will available
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

interface StripeElementsProps {
  children: React.ReactNode;
}

const StripeElements = ({ children }: StripeElementsProps) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeElements;
