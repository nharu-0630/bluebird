import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { TwUserSchema } from "../../(schema)/user";

interface UserCardProps {
  item: z.infer<typeof TwUserSchema>;
}

export function UserCard({ item }: UserCardProps) {
  const router = useRouter();
  return (
    <div
      key={item.id}
      className={
        "flex flex-col items-start gap-2 rounded-lg border text-left text-sm transition-all hover:bg-accent m-2 max-w-96"
      }
    >
      {item.profileBannerURL && (
        <div
          className="w-full h-24 rounded-t-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${item.profileBannerURL})` }}
        />
      )}
      <div className="flex flex-col items-start gap-2 p-3 m-2">
        <div className="flex flex-1 gap-2 flex-wrap items-center justify-start text-sm">
          <Button
            variant="link"
            className="flex gap-2 p-0"
            onClick={() => router.push(`/twitter/${item?.screenName}`)}
          >
            <Avatar className="flex-shrink-0">
              <AvatarImage src={item?.profileImageURL!} />
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <div className="font-semibold truncate">{item?.name}</div>
              <div className="text-xs font-medium">@{item?.screenName}</div>
            </div>
          </Button>
          <div className="flex flex-wrap items-center justify-around text-sm">
            <Button
              variant="link"
              onClick={() =>
                window.open(`/twitter/${item?.screenName}/followers`)
              }
            >
              <span className="text-xs">
                <span className="font-semibold">
                  {item?.followersCount?.toLocaleString()}
                </span>{" "}
                Followers
              </span>
            </Button>
            {item?.following && <Badge variant={"outline"}>Following</Badge>}
            <Button
              variant="link"
              onClick={() =>
                window.open(`/twitter/${item?.screenName}/following `)
              }
            >
              <span className="text-xs">
                <span className="font-semibold">
                  {item?.friendsCount?.toLocaleString()}
                </span>{" "}
                Following
              </span>
            </Button>
            {item?.followedBy && <Badge variant={"outline"}>FollowedBy</Badge>}
          </div>
        </div>
        <div className="text-s">
          <span>{item.description}</span>
        </div>
        <div className="flex flex-1 flex-wrap gap-2 justify-end items-center w-full">
          <div>
            <pre className="text-xs">{item.id}</pre>
            <pre className="text-xs">
              {item.createdAt && new Date(item.createdAt).toLocaleString()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
