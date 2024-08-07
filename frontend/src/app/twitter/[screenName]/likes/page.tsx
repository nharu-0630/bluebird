"use client";

import {
  GetTwitterLikesDocument,
  GetTwitterUserDocument,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import TweetsPage from "../../(components)/common/tweets-page";

export default function ScreenNameLikesPage({
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

  if (!userID) return <p>User not found</p>;
  return (
    <TweetsPage
      title="Likes"
      queryDocument={GetTwitterLikesDocument}
      queryName="twitterLikes"
      variables={{ userID: userID }}
    />
  );
}
