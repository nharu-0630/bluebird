"use client";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { ShelfItem } from "../../../(schema)/shelf-item";

interface ShelfItemDialogProps {
  shelfItem: ShelfItem;
  onOpenChange: (value: boolean) => void;
}

export function ShelfItemForm(props: ShelfItemDialogProps) {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">名前</h2>
        <p>{props.shelfItem.name}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">カテゴリ</h2>
        <p>{props.shelfItem.category.name}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">タグ</h2>
        <div className="flex items-center gap-2">
          {props.shelfItem.tags.map((tag) => (
            <Badge
              key={tag.ulid}
              variant="outline"
              className="h-8 min-w-[80px] rounded-md text-center"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">保管場所</h2>
        <p>{props.shelfItem.location.name}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">説明</h2>
        <p>{props.shelfItem.description}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">画像</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {props.shelfItem.images.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image src={image.signedUrl} width={400} height={400} alt={image.name} />
            </div>
          ))}
        </div>
      </div>
      <pre>{props.shelfItem.ulid}</pre>
    </div>
  );
}
