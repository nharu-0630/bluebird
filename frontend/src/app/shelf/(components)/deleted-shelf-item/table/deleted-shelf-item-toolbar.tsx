"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
  GetShelfTagsDocument,
  GetShelfTagsQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { TableFacetedFilter } from "../../../../../components/table/table-faceted-filter";
import { TableViewOptions } from "../../../../../components/table/table-view-options";

interface DeletedShelfItemToolbarProps<TData> {
  table: Table<TData>;
}

export function DeletedShelfItemToolbar<TData>({
  table,
}: DeletedShelfItemToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetShelfCategoriesQuery>(GetShelfCategoriesDocument);
  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery<GetShelfTagsQuery>(GetShelfTagsDocument);
  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useQuery<GetShelfLocationsQuery>(GetShelfLocationsDocument);

  if (categoryLoading || tagLoading || locationLoading) return null;
  if (categoryError || tagError || locationError) return null;

  const category =
    categoryData?.shelfCategories.map((category) => ({
      value: category.name,
      label: category.name,
    })) ?? [];
  const tag =
    tagData?.shelfTags.map((tag) => ({
      value: tag.name,
      label: tag.name,
    })) ?? [];
  const location =
    locationData?.shelfLocations.map((location) => ({
      value: location.name,
      label: location.name,
    })) ?? [];

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        placeholder="検索"
        value={(table.getColumn("名前")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("名前")?.setFilterValue(event.target.value)
        }
        className="w-full max-w-96"
      />
      {table.getColumn("カテゴリ") && (
        <TableFacetedFilter
          column={table.getColumn("カテゴリ")}
          title="カテゴリ"
          options={category}
        />
      )}
      {table.getColumn("タグ") && (
        <TableFacetedFilter
          column={table.getColumn("タグ")}
          title="タグ"
          options={tag}
        />
      )}
      {table.getColumn("保管場所") && (
        <TableFacetedFilter
          column={table.getColumn("保管場所")}
          title="保管場所"
          options={location}
        />
      )}
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
      <div className="ml-auto">
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
