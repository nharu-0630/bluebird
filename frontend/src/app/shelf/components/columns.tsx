"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ShelfItem } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ShelfItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🖊️ Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🧰 Category" />
    ),
    cell: (cell) => {
      return (
        <div className="flex items-center space-x-2">
          {cell.getValue() as any}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🏷️ Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.getValue("tags") as any;
      const displayTags = tags.map((tag: any) => {
        const foundTag = tags.find((tag: any) => tag.ulid === tag);
        return foundTag ? foundTag.name : tag;
      });
      return (
        <div className="flex max-w-[500px] space-x-2">
          {displayTags.map((tag: any) => (
            <Badge key={tag.ulid} variant="outline" className="h-8 rounded-md">
              {tag.name}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "location.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🌏 Location" />
    ),
    cell: (cell) => {
      return (
        <div className="flex items-center space-x-2">
          {cell.getValue() as any}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "ulid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🆔 ULID" />
    ),
    cell: (cell) => {
      return <pre>{cell.getValue() as any}</pre>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
];
