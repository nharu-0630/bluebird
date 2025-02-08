import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaDownload, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { z } from "zod";
import { PoIllustSchema } from "../../(schema)/illust";

interface IllustCardProps {
  item: z.infer<typeof PoIllustSchema>;
}

export function IllustCard({ item }: IllustCardProps) {
  const router = useRouter();
  return (
    <div
      key={item.id}
      className={
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent m-2 max-w-96"
      }
    >
      <div className="flex flex-1 gap-2 flex-wrap items-center justify-start text-sm">
        <Button
          variant="link"
          className="flex gap-2 p-0"
          onClick={() => router.push(`/${item.id}`)}
          // onClick={() => router.push(`/twitter/${item.user?.screenName}`)}
        >
          <Avatar className="flex-shrink-0">
            <AvatarImage src={item.user?.imageURL!} />
          </Avatar>
          <div className="flex flex-col items-start justify-center">
            <div className="font-semibold truncate">{item.user?.name}</div>
            <div className="text-xs font-medium">@{item.user?.id}</div>
          </div>
        </Button>
        <div className="flex flex-wrap items-center justify-around text-sm">
          <Button
            variant="link"
            // onClick={() =>
            //   window.open(`/twitter/${item.user?.screenName}/followers`)
            // }
          >
            <span className="text-xs">
              <span className="font-semibold">
                {item.user?.itemCount?.toLocaleString()}
              </span>{" "}
              Items
            </span>
          </Button>
          {item.user?.isFollowing && (
            <Badge variant={"outline"}>Following</Badge>
          )}
        </div>
      </div>
      <div className="text-s">
        <span>{item.description}</span>
      </div>
      {(item.imageURLs ?? []).length > 0 && (
        <div className="grid grid-cols-2 gap-4 w-full min-h-48 max-h-96">
          {item.imageURLs?.map((imageURL, index) => (
            <div
              key={imageURL}
              className={`${
                item.imageURLs!.length === 1
                  ? "col-span-2 row-span-2"
                  : item.imageURLs!.length === 2
                  ? "col-span-1"
                  : item.imageURLs!.length === 3 && index === 0
                  ? "col-span-2"
                  : ""
              } w-full h-auto rounded-lg overflow-hidden relative`}
            >
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={imageURL!}
                    alt={imageURL!}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg max-h-48"
                  />
                  <div className="absolute inset-0 flex items-end justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2 m-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(imageURL!);
                        }}
                      >
                        <FaExternalLinkAlt />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveAs(imageURL!);
                        }}
                      >
                        <FaDownload />
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
                  <div className="flex items-center justify-center">
                    <Image
                      src={imageURL!}
                      alt={imageURL!}
                      width={1920}
                      height={1080}
                      className="w-auto h-auto"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-wrap gap-2 justify-end items-center w-full">
        {/* <div>
          <pre className="text-xs">{item.id}</pre>
          <pre className="text-xs">
            {item.createdAt && new Date(item.createdAt).toLocaleString()}
          </pre>
        </div> */}
        <Button
          className="ml-auto"
          variant="outline"
          size="icon"
          // onClick={() =>
          //   window.open(
          //     `https://x.com/${item.user?.screenName}/status/${item.id}`
          //   )
          // }
        >
          <FaExternalLinkAlt />
        </Button>
        <Button
          variant="outline"
          size="icon"
          // onClick={() =>
          //   navigator.clipboard.writeText(
          //     `https://x.com/${item.user?.screenName}/status/${item.id}`
          //   )
          // }
        >
          <FaLink />
        </Button>
      </div>
    </div>
  );
}
