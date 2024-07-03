"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ShelfItem } from "../../../(schema)/shelf-item";
import { TableColumnHeader } from "../../../../../components/table/table-column-header";
import { ShelfItemRowActions } from "./shelf-item-row-actions";
import { ShelfItemRowName } from "./shelf-item-row-name";

export const ShelfItemColumns: ColumnDef<ShelfItem>[] = [
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
      <TableColumnHeader column={column} title="🖊️ 名前" />
    ),
    cell: ({ row }) => <ShelfItemRowName row={row} />,
  },
  {
    accessorKey: "category.name",
    id: "カテゴリ",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="🧰 カテゴリ" />
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
    accessorKey: "tags",
    id: "タグ",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="🏷️ タグ" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.ulid}
              variant="outline"
              className="h-8 min-w-[80px] rounded-md text-center"
            >
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
      <TableColumnHeader column={column} title="🌏 保管場所" />
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
    cell: ({ row }) => <ShelfItemRowActions row={row} />,
    enableHiding: false,
  },
];
