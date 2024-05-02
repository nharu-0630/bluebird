"use client";

import { ShelfItemSchema } from "@/app/shelf/schema/shelf-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  GetDeletedShelfItemsDocument,
  GetDeletedShelfItemsQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { DeletedShelfItemColumns } from "../table/deleted-shelf-item-columns";
import { DeletedShelfItemTable } from "../table/deleted-shelf-item-table";

export function DeletedShelfItemForm() {
  const { data, loading, error } = useQuery<GetDeletedShelfItemsQuery>(
    GetDeletedShelfItemsDocument
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
  const deletedItems = z
    .array(ShelfItemSchema)
    .parse(data?.deletedShelfItems ?? []);
  return (
    <div className="mb-4">
      <DeletedShelfItemTable
        columns={DeletedShelfItemColumns}
        data={deletedItems}
      />
    </div>
  );
}
