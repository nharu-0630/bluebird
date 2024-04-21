import { ShelfItems } from "../components/shelfItems";
import WithApollo from "../components/withApollo";

export default function ShelfPage() {
  return (
    <WithApollo>
      <ShelfItems />
    </WithApollo>
  );
}
