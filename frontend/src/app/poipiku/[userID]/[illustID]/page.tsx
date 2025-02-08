"use client";

import IllustPage from "../../(components)/common/illust-page";

export default function ScreenNamePage({
  params,
}: {
  params: { userID: string; illustID: string };
}) {
  return <IllustPage userID={params.userID} illustID={params.illustID} />;
}
