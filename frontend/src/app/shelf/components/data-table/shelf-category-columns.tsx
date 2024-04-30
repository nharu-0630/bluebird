"use client";

import { ShelfCategory } from "@/gql/gen/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ShelfCategoryRowActions } from "./shelf-category-row-actions";

export const ShelfCategoryColumns: ColumnDef<ShelfCategory>[] = [
  {
    accessorKey: "name",
    id: "名前",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🖊️ 名前" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">{row.original.name}</div>
      );
    },
  },
  {
    accessorKey: "ulid",
    id: "ULID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🆔 ULID" />
    ),
    cell: ({ row }) => {
      return <pre>{row.original.ulid}</pre>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ShelfCategoryRowActions row={row} />,
    enableHiding: false,
  },
];
