"use client";

import {
  GetTwitterTweetsDocument,
  GetTwitterUserDocument,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import TweetsPage from "../(components)/common/tweets-page";

export default function ScreenNamePage({
  params,
}: {
  params: { screenName: string };
}) {
  const { data, loading, error } = useQuery(GetTwitterUserDocument, {
    variables: { screenName: params.screenName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userID = data?.twitterUser?.id;

  return (
    <TweetsPage
      title="Tweets"
      queryDocument={GetTwitterTweetsDocument}
      queryName="twitterTweets"
      variables={{ userID: userID }}
    />
  );
}
