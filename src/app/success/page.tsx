import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import {
  InfoIcon,
  AlertCircleIcon,
  CheckIcon,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment method saved successfully.",
    icon: <CheckIcon className="w-10 h-10 text-green-500" />,
  },
  processing: {
    text: "Your setup is processing.",
    icon: <InfoIcon className="w-10 h-10 text-gray-500" />,
  },
  requires_payment_method: {
    text: "Your setup was not successful, please try again.",
    icon: <AlertCircleIcon className="w-10 h-10 text-red-500" />,
  },
  default: {
    text: "Something went wrong, please try again.",
    icon: <AlertCircleIcon className="w-10 h-10 text-red-500" />,
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ setup_intent: string }>;
}) {
  const { setup_intent: setupIntentId } = await searchParams;

  if (!setupIntentId) redirect("/");

  const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);

  if (!setupIntent) redirect("/");

  const status = setupIntent.status as keyof typeof STATUS_CONTENT_MAP;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card id="payment-status" className="">
        <CardTitle className="flex flex-col items-center gap-2 justify-center">
          {STATUS_CONTENT_MAP[status].icon}
          <span>{STATUS_CONTENT_MAP[status].text}</span>
        </CardTitle>
        <CardContent>
          {setupIntent && (
            <div id="details-table">
              <dl className="divide-y divide-gray-100">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">id</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {setupIntentId}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {status}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            {setupIntent && (
              <Button variant="outline" asChild>
                <a
                  href={`https://dashboard.stripe.com/setup_intents/${setupIntentId}`}
                  id="view-details"
                  target="_blank"
                >
                  View details
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            <Button id="retry-button" asChild>
              <Link href="/">Save another payment method</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
