"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GetShelfItemsDocument, GetShelfItemsQuery } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfItemColumns } from "./(components)/shelf-item/table/shelf-item-columns";
import { ShelfItemTable } from "./(components)/shelf-item/table/shelf-item-table";
import { ShelfItemTableButtons } from "./(components)/shelf-item/table/shelf-item-table-buttons";
import { ShelfItemSchema } from "./(schema)/shelf-item";

const queryClient = new QueryClient();

export default function ShelfPage() {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (error)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  const items = z.array(ShelfItemSchema).parse(data?.shelfItems ?? []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-7xl h-full">
        <h1 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
          シェルフ
        </h1>
        <div className="space-y-4">
          <ShelfItemTableButtons />
          <div className="mb-4">
            <ShelfItemTable columns={ShelfItemColumns} data={items} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
