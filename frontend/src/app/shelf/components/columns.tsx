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
          aria-label="すべてのアイテムを選択"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="アイテムを選択"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "category.name",
    id: "カテゴリ",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🧰 カテゴリ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.original.category.name}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tags.name",
    id: "タグ",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🏷️ タグ" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="flex max-w-[500px] space-x-2">
          {tags.map((tag: any) => (
            <Badge key={tag.ulid} variant="outline" className="h-8 rounded-md">
              {tag.name}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const tags = row.original.tags;
      return value.every((selectedTag: any) =>
        tags.some((tag) => tag.name === selectedTag)
      );
    },
  },
  {
    accessorKey: "location.name",
    id: "保管場所",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="🌏 保管場所" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          {row.original.location.name}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
];
