"use client";

import {
  GetShelfItemsDocument,
  GetShelfItemsQuery,
} from "@/gql/gen/client/graphql";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { shelfItemSchema } from "../data/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ShelfTable() {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const shelfItems = z.array(shelfItemSchema).parse(data?.shelfItems ?? []);
  return (
    <div className="mb-4">
      <DataTable columns={columns} data={shelfItems} />
    </div>
  );
}
