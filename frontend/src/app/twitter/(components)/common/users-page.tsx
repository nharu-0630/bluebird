"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { z } from "zod";
import { TwUserSchema } from "../../(schema)/user";
import { UserCard } from "./user-card";

interface UsersPageProps {
  title: string;
  queryDocument: any;
  queryName: string;
  variables?: Record<string, any>;
}

export default function UsersPage({
  title,
  queryDocument,
  queryName,
  variables = {},
}: UsersPageProps) {
  const [users, setUsers] = useState<z.infer<typeof TwUserSchema>[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchMore } = useQuery(queryDocument, {
    variables: {
      ...variables,
      cursor,
    },
  });

  return (
    <div className="max-w-full mx-auto h-full">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight p-2">
        {title}
      </h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchMore({
            variables: {
              ...variables,
              cursor,
            },
          }).then((data) => {
            const newUsers = z
              .array(TwUserSchema)
              .parse(data.data?.[queryName]?.users ?? []);
            setUsers([...users, ...newUsers]);
            setHasMore(data.data?.[queryName]?.cursor === null ? false : true);
            setCursor(data.data?.[queryName]?.cursor ?? null);
          });
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {users.map((item) => (
          <UserCard key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
