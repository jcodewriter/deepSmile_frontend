export interface CreditCardInputs {
  cardNumber: string;
  cardExpiration: string;
  cardCCV: string;
}

export interface PlansInputs {
  yearly: string;
  plan: "free" | "solo" | "cabinet" | "tailored";
}
