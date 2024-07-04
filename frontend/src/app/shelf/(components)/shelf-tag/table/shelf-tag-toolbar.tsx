"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface ShelfTagToolbarProps<TData> {
  table: Table<TData>;
}

export function ShelfTagToolbar<TData>({ table }: ShelfTagToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex gap-2">
      <Input
        placeholder="検索"
        value={(table.getColumn("名前")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("名前")?.setFilterValue(event.target.value)
        }
        className="w-full max-w-96"
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="px-2 lg:px-3"
        >
          リセット
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
