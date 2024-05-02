"use client";

import { ShelfTag } from "@/gql/gen/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { TableColumnHeader } from "../../../../../components/table/table-column-header";
import { ShelfTagRowActions } from "./shelf-tag-row-actions";

export const ShelfTagColumns: ColumnDef<ShelfTag>[] = [
  {
    accessorKey: "name",
    id: "名前",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="🖊️ 名前" />
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
      <TableColumnHeader column={column} title="🆔 ULID" />
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
    cell: ({ row }) => <ShelfTagRowActions row={row} />,
    enableHiding: false,
  },
];
