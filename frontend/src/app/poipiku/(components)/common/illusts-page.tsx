"use client";

import { PoIllustsByIdDocument } from "@/gql/gen/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { z } from "zod";
import { PoIllustSchema } from "../../(schema)/illust";
import { IllustCard } from "./illust-card";

interface IllustsPageProps {
  userID: string;
}

export default function IllustsPage({ userID }: IllustsPageProps) {
  let [illusts, setIllusts] = useState<z.infer<typeof PoIllustSchema>[]>([]);
  let [hasMore, setHasMore] = useState<boolean>(true);
  let [pageIdx, setPageIdx] = useState<number>(0);
  let { fetchMore } = useQuery(PoIllustsByIdDocument, {
    variables: {
      userID: userID,
    },
  });

  return (
    <div className="max-w-full mx-auto h-full">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight p-2"></h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchMore({
            variables: {
              userID: userID,
              cursor: pageIdx,
            },
          }).then((data) => {
            const newIllusts = z
              .array(PoIllustSchema)
              .parse(data.data.poIllustsByID.illusts ?? []);
            setIllusts([...illusts, ...newIllusts]);
            setHasMore(data.data.poIllustsByID.hasNext);
            setPageIdx(pageIdx + 1);
          });
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {illusts.map((item) => (
          <IllustCard key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
