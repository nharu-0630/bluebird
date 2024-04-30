"use client";

import {
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfCategorySchema } from "../schema/shelf-category";
import { DataTable } from "./data-table/data-table";
import { ShelfCategoryColumns } from "./data-table/shelf-category-columns";

export default function ShelfCategoryTable() {
  const { data, loading, error } = useQuery<GetShelfCategoriesQuery>(
    GetShelfCategoriesDocument
  );
  if (loading)
    return (
      <div className="flex justify-center">
        <TailSpin />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const shelfCategories = z
    .array(ShelfCategorySchema)
    .parse(data?.shelfCategories ?? []);
  return (
    <div className="mb-4">
      <DataTable columns={ShelfCategoryColumns} data={shelfCategories} />
    </div>
  );
}
