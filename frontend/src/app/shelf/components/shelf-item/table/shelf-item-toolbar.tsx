"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { TailSpin } from "react-loader-spinner";
import { TableFacetedFilter } from "../../../../../components/table/table-faceted-filter";
import { TableViewOptions } from "../../../../../components/table/table-view-options";

interface ShelfItemToolbarProps<TData> {
  table: Table<TData>;
}

export function ShelfItemToolbar<TData>({
  table,
}: ShelfItemToolbarProps<TData>) {
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

  if (categoryLoading || tagLoading || locationLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (categoryError || tagError || locationError)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {categoryError?.message ??
            tagError?.message ??
            locationError?.message ??
            "エラーが発生しました"}
        </AlertDescription>
      </Alert>
    );

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
  const tag =
    tagData?.shelfTags.map((tag) => ({
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
            className="h-8 px-2 lg:px-3"
          >
            リセット
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <TableViewOptions table={table} />
    </div>
  );
}
