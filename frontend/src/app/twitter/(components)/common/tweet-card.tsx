import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@radix-ui/react-dialog";
import { saveAs } from "file-saver";
import Image from "next/image";
import { FaDownload, FaExternalLinkAlt, FaLink, FaStar } from "react-icons/fa";
import { FaReply, FaRetweet } from "react-icons/fa6";
import { z } from "zod";
import { TwitterTweetSchema } from "../../(schema)/twitter-tweet";

interface TweetCardProps {
  item: z.infer<typeof TwitterTweetSchema>;
}

export function TweetCard({ item }: TweetCardProps) {
  return (
    <div
      key={item.id}
      className={
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent m-2"
      }
    >
      <div className="flex w-full h-10 items-center justify-start space-x-4 text-sm">
        <Button
          variant="link"
          className="flex gap-2 p-0"
          onClick={() => window.open(`https://x.com/${item.user?.screenName}`)}
        >
          <Avatar className="flex-shrink-0">
            <AvatarImage src={item.user?.profileImageURL!} />
          </Avatar>
          <div className="flex flex-col items-start justify-center">
            <div className="font-semibold">{item.user?.name}</div>
            <div className="text-xs font-medium">@{item.user?.screenName}</div>
          </div>
        </Button>
        <div className="flex w-full h-10 items-center justify-around space-x-4 text-sm">
          <Separator orientation="vertical" />
          <Button
            variant="link"
            onClick={() =>
              window.open(`https://x.com/${item.user?.screenName}/followers`)
            }
          >
            <span>
              <span className="font-semibold">{item.user?.followersCount}</span>{" "}
              Followers
            </span>
          </Button>
          {item.user?.following && <Badge variant={"outline"}>Following</Badge>}
          <Separator orientation="vertical" />
          <Button
            variant="link"
            onClick={() =>
              window.open(`https://x.com/${item.user?.screenName}/following `)
            }
          >
            <span>
              <span className="font-semibold">{item.user?.friendsCount}</span>{" "}
              Friends
            </span>
          </Button>
          {item.user?.followedBy && (
            <Badge variant={"outline"}>FollowedBy</Badge>
          )}
        </div>
      </div>
      <div className="my-2 text-s">{item.fullText}</div>
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
        <Button
          variant="link"
          onClick={() =>
            window.open(
              `https://x.com/${item.user?.screenName}/status/${item.id}`
            )
          }
        >
          <FaReply />
          <span className="ml-2 font-semibold">{item.replyCount}</span>
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant="link"
          onClick={() =>
            window.open(
              `https://x.com/${item.user?.screenName}/status/${item.id}/retweets`
            )
          }
        >
          <FaRetweet />
          <span className="ml-2 font-semibold">{item.retweetCount}</span>
          {(item.quoteCount ?? 0) > 0 && (
            <span className="font-semibold"> ({item.quoteCount})</span>
          )}
        </Button>
        {item.retweeted && (
          <Badge className="ml-2" variant="outline">
            Retweeted
          </Badge>
        )}
        <Separator orientation="vertical" />
        <Button
          variant="link"
          onClick={() =>
            window.open(
              `https://x.com/${item.user?.screenName}/status/${item.id}/likes`
            )
          }
        >
          <FaStar />
          <span className="ml-2 font-semibold">{item.favoriteCount}</span>
        </Button>
        {item.favorited && (
          <Badge className="ml-2" variant="outline">
            Liked
          </Badge>
        )}
      </div>
      <div className="flex w-full gap-2 justify-end items-center">
        <pre className="text-xs">{item.id}</pre>
        <pre className={"ml-auto text-xs"}>
          {item.createdAt && new Date(item.createdAt).toLocaleString()}
        </pre>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            window.open(
              `https://x.com/${item.user?.screenName}/status/${item.id}`
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
              `https://x.com/${item.user?.screenName}/status/${item.id}`
            )
          }
        >
          <FaLink />
        </Button>
      </div>
    </div>
  );
}
