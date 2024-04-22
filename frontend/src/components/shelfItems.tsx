"use client";

import {
  GetShelfItemsDocument,
  GetShelfItemsQuery,
} from "@/gql/gen/client/graphql";
import { mockShelfItems } from "@/mock/shelf";
import { useQuery } from "@apollo/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

export const ShelfItems = () => {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  // const shelfItems = data?.shelfItems ?? [];
  const shelfItems = mockShelfItems;

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => {
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />;
      },
      cell: 
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            🖊️ Name
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              title="Sort by Name"
              className={getSortedIcon(column.getIsSorted()) + " ms-1"}
            />
          </div>
        );
      },
      accessorKey: "name",
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            🧰 Category
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              title="Sort by Category"
              className={getSortedIcon(column.getIsSorted()) + " ms-1"}
            />
          </div>
        );
      },
      accessorKey: "category.name",
    },
    {
      header: "Tag",
      accessorKey: "tags",
      cell: (props) => {
        const tags = props.getValue() as any[];
        return (
          <div>
            {tags.map((tag: any) => (
              <span
                key={tag.ulid}
                className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        );
      },
      filterFn: "arrIncludesSome",
    },
    {
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            🌏 Location
            <button
              type="button"
              onClick={column.getToggleSortingHandler()}
              title="Sort by Location"
              className={getSortedIcon(column.getIsSorted()) + " ms-1"}
            />
          </div>
        );
      },
      accessorKey: "location.name",
    },
    {
      header: "Action",
      cell: (props) => {
        return (
          <button
            className="text-blue-600 underline dark:text-blue-400"
            type="button"
            onClick={() => {
              console.log("Edit", props.row.original);
            }}
          >
            Edit
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: shelfItems,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading)
    return (
      <div
        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="font-medium">Loading...</span>
      </div>
    );
  if (error)
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Error:</span> {error.message}
      </div>
    );

  return (
    <div className="w-full">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        📦 ShelfItems
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {shelfItems.length} items
      </p>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="p-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                table.getRowCount()
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {table.getRowCount()}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                type="button"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {(function () {
              const pages = [];
              let minIndex = Math.max(
                0,
                table.getState().pagination.pageIndex - 2
              );
              let maxIndex = Math.min(
                table.getPageCount(),
                table.getState().pagination.pageIndex + 3
              );
              if (maxIndex - minIndex < 5) {
                if (minIndex === 0) {
                  maxIndex = Math.min(5, table.getPageCount());
                } else {
                  minIndex = Math.max(0, table.getPageCount() - 5);
                }
              }
              for (let i = minIndex; i < maxIndex; i++) {
                pages.push(
                  <li key={i}>
                    <button
                      onClick={() => table.setPageIndex(i)}
                      type="button"
                      className={
                        table.getState().pagination.pageIndex === i
                          ? "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                          : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              }
              return pages;
            })()}
            <li>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                type="button"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
