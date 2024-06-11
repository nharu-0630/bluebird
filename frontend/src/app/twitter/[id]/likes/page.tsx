"use client";

import {
  GetTwitterLikesDocument,
  GetTwitterLikesQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { z } from "zod";
import { TweetCard } from "../../(components)/common/tweet-card";
import { TwitterTweetSchema } from "../../(schema)/twitter-tweet";

export default function LikesPage({ params }: { params: { id: string } }) {
  const [tweets, setTweets] = useState<z.infer<typeof TwitterTweetSchema>[]>(
    []
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchMore } = useQuery<GetTwitterLikesQuery>(
    GetTwitterLikesDocument,
    {
      variables: {
        userID: params.id,
        cursor,
      },
    }
  );

  return (
    <div className="max-w-xl h-full">
      <h1 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
        いいね
      </h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchMore({
            variables: {
              cursor,
            },
          }).then((data) => {
            const newTweets = z
              .array(TwitterTweetSchema)
              .parse(data.data?.twitterLikes?.tweets ?? []);
            setTweets([...tweets, ...newTweets]);
            setHasMore(data.data?.twitterLikes?.cursor === null ? false : true);
            setCursor(data.data?.twitterLikes?.cursor ?? null);
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
