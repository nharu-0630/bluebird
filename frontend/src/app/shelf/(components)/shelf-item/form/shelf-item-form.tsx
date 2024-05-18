"use client";

import ImageLoading from "@/components/image-loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { ShelfItem } from "../../../(schema)/shelf-item";

interface ShelfItemDialogProps {
  shelfItem: ShelfItem;
  onOpenChange: (value: boolean) => void;
}

export function ShelfItemForm(props: ShelfItemDialogProps) {
  const { toast } = useToast();

  return (
    <Carousel>
      <CarouselContent>
        {props.shelfItem.images.map((image, index) => (
          <CarouselItem key={index}>
            <ImageLoading baseUri={image.baseUri} token={image.token} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
