"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { AlertCircleIcon, InfoIcon, Loader2 } from "lucide-react";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentForm({
  setupIntentClientSecret,
}: {
  setupIntentClientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  // France, Italy and Germany are supported
  const allowedCountries = ["DE", "FR", "IT"];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleError = (stripeError: StripeError) => {
    if (
      stripeError.type === "card_error" ||
      stripeError.type === "validation_error"
    ) {
      setErrorMessage(stripeError.message as string);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the ConfirmationToken using the details collected by the Payment Element
    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements,
      params: {
        payment_method_data: {
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      },
    });

    if (error) {
      handleError(error);
      return;
    }

    // Check if PM comes from a valid country
    let country = "unknown";
    if (
      confirmationToken.payment_method_preview.type === "sepa_debit" &&
      confirmationToken.payment_method_preview.sepa_debit
    ) {
      console.log("sepa");
      console.log(confirmationToken.payment_method_preview.sepa_debit);
      country =
        confirmationToken.payment_method_preview.sepa_debit.country ??
        "unknown";
    }

    if (
      confirmationToken.payment_method_preview.type === "card" &&
      confirmationToken.payment_method_preview.card
    ) {
      console.log("card");
      console.log(confirmationToken.payment_method_preview.card);
      country =
        confirmationToken.payment_method_preview.card.country ?? "unknown";
    }

    const validCountry = allowedCountries.includes(country);

    if (!validCountry) {
      setErrorMessage(`Payment method from unsupported country: ${country}`);
      setIsLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmSetup({
      clientSecret: setupIntentClientSecret,
      confirmParams: {
        confirmation_token: confirmationToken.id,
        return_url: "http://localhost:3000/success",
      },
    });
    if (confirmError) {
      handleError(confirmError);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment method.</AlertTitle>
          <AlertDescription>
            <p>{errorMessage}</p>
          </AlertDescription>
        </Alert>
      )}
      {infoMessage && (
        <Alert variant="default" className="mb-4">
          <InfoIcon />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            <p>{infoMessage}</p>
          </AlertDescription>
        </Alert>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          options={{ layout: "accordion" }}
          onChange={(event) => {
            setCompleted(event.complete);
          }}
        />
        <Button
          disabled={isLoading || !stripe || !elements || !completed}
          id="submit"
          className="w-full mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            "Save payment method"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function CheckoutForm({
  setupIntentClientSecret,
}: {
  setupIntentClientSecret: string;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "setup",
        currency: "eur",
        paymentMethodTypes: ["card", "sepa_debit"],
        paymentMethodCreation: "manual",
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <PaymentForm setupIntentClientSecret={setupIntentClientSecret} />
    </Elements>
  );
}
