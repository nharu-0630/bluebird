"use client";

import {
  GetShelfItemsDocument,
  GetShelfItemsQuery,
} from "@/gql/gen/client/graphql";
import { useQuery } from "@apollo/client";

export const ShelfItems = () => {
  const { data, loading, error } = useQuery<GetShelfItemsQuery>(
    GetShelfItemsDocument
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const shelfItems = data?.shelfItems ?? [];

  return (
    <div>
      <ul>
        {shelfItems.map((item) => (
          <li key={item.ulid}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
            {/* <Box>
              <Card>
                <Flex gap="3" align="center">
                  <Box>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                  </Box>
                </Flex>
              </Card>
            </Box> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
