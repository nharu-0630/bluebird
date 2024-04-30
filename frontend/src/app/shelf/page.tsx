import WithApollo from "../../components/with-apollo";
import ShelfItemTable from "./components/shelf-item-table";
import { ShelfItemTableButtons } from "./components/shelf-item-table-buttons";

export default function ShelfPage() {
  return (
    <WithApollo>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            📦 アイテム
          </h1>
          <div className="space-y-4">
            <ShelfItemTableButtons />
            <ShelfItemTable />
          </div>
        </div>
      </main>
    </WithApollo>
  );
}
