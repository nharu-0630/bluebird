"use client";

import {
  GetTwitterLikesDocument,
  GetTwitterLikesQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { z } from "zod";
import { TweetCard } from "../components/common/tweet-card";
import { TwitterTweetSchema } from "../schema/twitter-tweet";

const queryClient = new QueryClient();

export default function LikesPage() {
  const [tweets, setTweets] = useState<z.infer<typeof TwitterTweetSchema>[]>(
    []
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchMore } = useQuery<GetTwitterLikesQuery>(
    GetTwitterLikesDocument,
    {
      variables: {
        userID: "1003084799592972288",
        cursor,
      },
      onCompleted: (data) => {
        const newTweets = z
          .array(TwitterTweetSchema)
          .parse(data.twitterLikes?.tweets ?? []);
        setTweets([...tweets, ...newTweets]);
        setHasMore(data.twitterLikes?.cursor === null ? false : true);
        setCursor(data.twitterLikes?.cursor ?? null);
      },
    }
  );
  const next = async () => {
    await fetchMore({
      variables: {
        cursor,
      },
    });
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          いいね
        </h1>
        <InfiniteScroll
          dataLength={tweets.length}
          next={next}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="flex flex-col gap-2 pt-0">
            {tweets.map((item) => (
              <TweetCard key={item.id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </QueryClientProvider>
  );
}
