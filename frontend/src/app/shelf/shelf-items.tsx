import { mockShelfItems } from "@/mock/shelf";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { shelfItemSchema } from "./data/schema";

async function GetData() {
  // const { data, loading, error } = useQuery<GetShelfItemsQuery>(
  //   GetShelfItemsDocument
  // );
  // if (loading) return [];
  // if (error) throw error;
  // return data?.shelfItems ?? [];
  return z.array(shelfItemSchema).parse(mockShelfItems);
}

export default async function ShelfItems() {
  const data = await GetData();
  return (
    <div className="w-full">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        📦 ShelfItems
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {data.length} items
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
