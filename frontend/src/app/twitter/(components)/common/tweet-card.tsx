import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { saveAs } from "file-saver";
import Image from "next/image";
import { FaDownload, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { z } from "zod";
import { TwitterTweetSchema } from "../../(schema)/twitter-tweet";

interface TweetCardProps {
  item: z.infer<typeof TwitterTweetSchema>;
}

export function TweetCard({ item }: TweetCardProps) {
  return (
    <button
      key={item.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
        // mail.selected === item.id && "bg-muted"
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={item.user?.profileImageURL!} />
            </Avatar>
            <div>
              <div className="font-semibold">{item.user?.name}</div>
              <div className="text-xs font-medium">{item.user?.screenName}</div>
            </div>
            <div>
              <span className="font-semibold">{item.user?.followersCount}</span>{" "}
              Followers
              {item.user?.following && (
                <Badge className="ml-2" variant={"outline"}>
                  Following
                </Badge>
              )}
            </div>
            <span className="font-semibold">{item.user?.friendsCount}</span>{" "}
            Friends
            {item.user?.followedBy && (
              <Badge variant={"outline"}>FollowedBy</Badge>
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs"
              //   mail.selected === item.id
              //     ? "text-foreground"
              //     : "text-muted-foreground"
            )}
          >
            {item.createdAt}
          </div>
        </div>
      </div>
      <div className="text-s">{item.fullText}</div>
      {item.media!.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {item.media?.map((media) => (
            <div
              key={media.id}
              className="w-64 h-48 rounded-lg overflow-hidden flex-shrink-0 relative"
            >
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={media.thumbURL!}
                    alt={media.id!}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-end justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2 m-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(media.thumbURL!);
                        }}
                      >
                        <FaExternalLinkAlt />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveAs(media.thumbURL!, media.id!);
                        }}
                      >
                        <FaDownload />
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="overflow-y-scroll max-h-screen">
                  <div className="flex items-center justify-center h-full">
                    {(media.type === "animated/gif" ||
                      media.type === "video") && (
                      <video
                        src={media.videoURL!}
                        controls
                        className="w-full h-auto"
                      />
                    )}
                    {media.type === "photo" && (
                      <Image
                        src={media.thumbURL!}
                        alt={media.id!}
                        width={1920}
                        height={1080}
                        className="w-auto h-full"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full h-5 items-center justify-around space-x-4 text-sm">
        <div>
          <span className="font-semibold">{item.replyCount}</span> Replies
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="font-semibold">
            {item.retweetCount} ({item.quoteCount})
          </span>{" "}
          Retweets
          {item.retweeted && (
            <Badge className="ml-2" variant="outline">
              Retweeted
            </Badge>
          )}
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="font-semibold">{item.favoriteCount}</span> Likes
          {item.favorited && (
            <Badge className="ml-2" variant="outline">
              Liked
            </Badge>
          )}
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              `https://twitter.com/${item.user?.screenName}/status/${item.id}`
            )
          }
        >
          <FaExternalLinkAlt />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            navigator.clipboard.writeText(
              `https://twitter.com/${item.user?.screenName}/status/${item.id}`
            )
          }
        >
          <FaLink />
        </Button>
      </div>
    </button>
  );
}
