"use client";

import { TwLikesDocument, TwUserByScreenNameDocument } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import TweetsPage from "../../(components)/common/tweets-page";

export default function ScreenNameLikesPage({
  params,
}: {
  params: { screenName: string };
}) {
  const { data, loading, error } = useQuery(TwUserByScreenNameDocument, {
    variables: { screenName: params.screenName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userID = data?.twUserByScreenName?.id;

  if (!userID) return <p>User not found</p>;
  return (
    <TweetsPage
      title="Likes"
      queryDocument={TwLikesDocument}
      queryName="twLikes"
      variables={{ userID: userID }}
    />
  );
}
