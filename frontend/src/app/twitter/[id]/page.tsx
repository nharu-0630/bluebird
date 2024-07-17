"use client";

import { GetTwitterTweetsDocument } from "@/gql/gen/graphql";
import TweetsPage from "../(components)/common/tweets-page";

export default function IDPage({ params }: { params: { id: string } }) {
  return (
    <TweetsPage
      title="Tweets"
      queryDocument={GetTwitterTweetsDocument}
      queryName="twitterTweets"
      variables={{ userID: params.id }}
    />
  );
}
