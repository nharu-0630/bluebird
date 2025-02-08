"use client";

import IllustsPage from "../(components)/common/illusts-page";

export default function ScreenNamePage({
  params,
}: {
  params: { userID: string };
}) {
  return <IllustsPage userID={params.userID} />;
}
