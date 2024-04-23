import WithApollo from "../../components/withApollo";
import ShelfItems from "./shelf-items";

export default function ShelfPage() {
  return (
    <WithApollo>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ShelfItems />
      </main>
    </WithApollo>
  );
}
