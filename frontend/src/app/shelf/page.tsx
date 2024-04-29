import WithApollo from "../../components/with-apollo";
import ShelfTable from "./components/shelf-table";
import { ShelfTableButtons } from "./components/shelf-table-buttons";

export default function ShelfPage() {
  return (
    <WithApollo>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            📦 アイテム
          </h1>
          <div className="space-y-4">
            <ShelfTableButtons />
            <ShelfTable />
          </div>
        </div>
      </main>
    </WithApollo>
  );
}
