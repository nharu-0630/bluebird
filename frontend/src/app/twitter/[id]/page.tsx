"use client";

import {
  GetTwitterTweetsDocument,
  GetTwitterTweetsQuery,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { z } from "zod";
import { TweetCard } from "../(components)/common/tweet-card";
import { TwitterTweetSchema } from "../(schema)/twitter-tweet";

export default function TweetsPage({ params }: { params: { id: string } }) {
  const [tweets, setTweets] = useState<z.infer<typeof TwitterTweetSchema>[]>(
    []
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchMore } = useQuery<GetTwitterTweetsQuery>(
    GetTwitterTweetsDocument,
    {
      variables: {
        userID: params.id,
        cursor,
      },
      onCompleted: (data) => {
        const newTweets = z
          .array(TwitterTweetSchema)
          .parse(data.twitterTweets?.tweets ?? []);
        setTweets([...tweets, ...newTweets]);
        setHasMore(data.twitterTweets?.cursor === null ? false : true);
        setCursor(data.twitterTweets?.cursor ?? null);
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
    <div className="w-full">
      <h1 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
        ポスト
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
  );
}
