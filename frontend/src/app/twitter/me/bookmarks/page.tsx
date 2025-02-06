"use client";

import { TwBookmarksDocument } from "@/gql/gen/graphql";
import TweetsPage from "../../(components)/common/tweets-page";

export default function MeBookmarksPage() {
  return (
    <TweetsPage
      title="Bookmarks"
      queryDocument={TwBookmarksDocument}
      queryName="twBookmarks"
    />
  );
}
