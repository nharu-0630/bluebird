"use client";

import { GetShelfItemsDocument, GetShelfItemsQuery } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfItemSchema } from "../../schema/shelf-item";
import { ShelfItemColumns } from "./table/shelf-item-columns";
import { ShelfItemTable } from "./table/shelf-item-table";

export function ShelfItem() {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  if (loading)
    return (
      <div className="flex justify-center">
        <TailSpin />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const shelfItems = z.array(ShelfItemSchema).parse(data?.shelfItems ?? []);
  return (
    <div className="mb-4">
      <ShelfItemTable columns={ShelfItemColumns} data={shelfItems} />
    </div>
  );
}
