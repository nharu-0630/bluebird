"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { z } from "zod";
import { TwTweetSchema } from "../../(schema)/tweet";
import { TweetCard } from "./tweet-card";

interface TweetsPageProps {
  title: string;
  queryDocument: any;
  queryName: string;
  variables?: Record<string, any>;
}

export default function TweetsPage({
  title,
  queryDocument,
  queryName,
  variables = {},
}: TweetsPageProps) {
  let [tweets, setTweets] = useState<z.infer<typeof TwTweetSchema>[]>([]);
  let [hasMore, setHasMore] = useState<boolean>(true);
  let [cursor, setCursor] = useState<string | null>(null);
  let { fetchMore } = useQuery(queryDocument, {
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
            const newTweets = z
              .array(TwTweetSchema)
              .parse(data.data?.[queryName]?.tweets ?? []);
            setTweets([...tweets, ...newTweets]);
            setHasMore(data.data?.[queryName]?.cursor === null ? false : true);
            setCursor(data.data?.[queryName]?.cursor ?? null);
          });
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {tweets.map((item) => (
          <TweetCard key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
