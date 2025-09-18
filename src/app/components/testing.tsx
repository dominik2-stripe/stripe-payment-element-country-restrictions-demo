import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/ui/copy-button";

export default function Testing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testing</CardTitle>
        <CardDescription>
          Use the following test cards to test the country restriction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cards">
          <TabsList className="w-full">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="sepa">SEPA account numbers</TabsTrigger>
          </TabsList>
          <TabsContent value="cards">
            <Table>
              <TableCaption>
                See{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href="https://docs.stripe.com/testing#international-cards"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe documentation
                </a>{" "}
                for more details.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Country</TableHead>
                  <TableHead className="text-right">Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">US</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="4242424242424242" formatValue />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DE</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="4000002760000016" formatValue />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="4000003800000008" formatValue />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FR</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="4000002500000003" formatValue />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="sepa">
            <Table>
              <TableCaption>
                See{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href="https://docs.stripe.com/payments/sepa-debit/accept-a-payment?web-or-mobile=web&payment-ui=stripe-hosted#test-integration"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe documentation
                </a>{" "}
                for more details.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Country</TableHead>
                  <TableHead className="text-right">Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">UK</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="GB82WEST12345698765432" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DE</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="DE89370400440532013000" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">IT</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="n/a" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FR</TableCell>
                  <TableCell className="text-right">
                    <CopyButton value="FR1420041010050500013M02606" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
