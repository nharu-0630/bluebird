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
} from "@/gql/gen/client/graphql";
import { useQuery } from "@apollo/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetShelfCategoriesQuery>(GetShelfCategoriesDocument);
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery<GetShelfTagsQuery>(GetShelfTagsDocument);
  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useQuery<GetShelfLocationsQuery>(GetShelfLocationsDocument);

  if (categoryLoading || tagsLoading || locationLoading) return null;
  if (categoryError || tagsError || locationError) return null;

  const category =
    categoryData?.shelfCategories.map((category) => ({
      value: category.name,
      label: category.name,
    })) ?? [];
  const location =
    locationData?.shelfLocations.map((location) => ({
      value: location.name,
      label: location.name,
    })) ?? [];
  const tags =
    tagsData?.shelfTags.map((tag) => ({
      value: tag.name,
      label: tag.name,
    })) ?? [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder=""
          value={(table.getColumn("名前")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("名前")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("カテゴリ") && (
          <DataTableFacetedFilter
            column={table.getColumn("カテゴリ")}
            title="カテゴリ"
            options={category}
          />
        )}
        {table.getColumn("タグ") && (
          <DataTableFacetedFilter
            column={table.getColumn("タグ")}
            title="タグ"
            options={tags}
          />
        )}
        {table.getColumn("保管場所") && (
          <DataTableFacetedFilter
            column={table.getColumn("保管場所")}
            title="保管場所"
            options={location}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            リセット
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
