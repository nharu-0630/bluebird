"use client";

import {
  TwFollowingDocument,
  TwUserByScreenNameDocument,
} from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import UsersPage from "../../(components)/common/users-page";

export default function ScreenNameFollowingPage({
  params,
}: {
  params: { screenName: string };
}) {
  const { data, loading, error } = useQuery(TwUserByScreenNameDocument, {
    variables: { screenName: params.screenName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <UsersPage
      title="Following"
      queryDocument={TwFollowingDocument}
      queryName="twFollowing"
      variables={{ userID: data?.twUserByScreenName?.id }}
    />
  );
}
