import { stripe } from "@/lib/stripe";
import CheckoutForm from "./components/checkout-form";
import Testing from "./components/testing";

export default async function SavePaymentMethodPage() {
  const customerId = process.env.STRIPE_CUSTOMER_ID!;
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ["card", "sepa_debit"],
  });

  const setupIntentClientSecret = setupIntent.client_secret as string;

  return (
    <main className="p-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <CheckoutForm setupIntentClientSecret={setupIntentClientSecret} />
        <Testing />
      </div>
    </main>
  );
}
