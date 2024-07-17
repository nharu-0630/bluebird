"use client";

import { GetTwitterLikesDocument } from "@/gql/gen/graphql";
import TweetsPage from "../../(components)/common/tweets-page";

export default function IDLikesPage({ params }: { params: { id: string } }) {
  return (
    <TweetsPage
      title="Likes"
      queryDocument={GetTwitterLikesDocument}
      queryName="twitterLikes"
      variables={{ userID: params.id }}
    />
  );
}
