"use client";

import { GetShelfItemsDocument, GetShelfItemsQuery } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfItemColumns } from "./components/shelf-item/table/shelf-item-columns";
import { ShelfItemTable } from "./components/shelf-item/table/shelf-item-table";
import { ShelfItemTableButtons } from "./components/shelf-item/table/shelf-item-table-buttons";
import { ShelfItemSchema } from "./schema/shelf-item";

export default function ShelfPage() {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <TailSpin />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const shelfItems = z.array(ShelfItemSchema).parse(data?.shelfItems ?? []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          📦 アイテム
        </h1>
        <div className="space-y-4">
          <ShelfItemTableButtons />
          <div className="mb-4">
            <ShelfItemTable columns={ShelfItemColumns} data={shelfItems} />
          </div>
        </div>
      </div>
    </main>
  );
}
