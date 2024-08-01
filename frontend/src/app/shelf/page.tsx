"use client";

import { ErrorPage } from "@/components/error-page";
import { LoadingPage } from "@/components/loading-page";
import { GetShelfItemsDocument, GetShelfItemsQuery } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    return (<LoadingPage />);
  if (error)
    return (<ErrorPage message={"Failed to load shelf items"} />);
  const items = z.array(ShelfItemSchema).parse(data?.shelfItems ?? []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-7xl h-full p-4">
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
