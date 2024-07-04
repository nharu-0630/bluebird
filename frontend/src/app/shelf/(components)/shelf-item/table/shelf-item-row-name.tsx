"use client";

import { useDialog } from "@/components/extension/use-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { ShelfItemSchema } from "../../../(schema)/shelf-item";
import { ShelfItemForm } from "../form/shelf-item-form";

interface ShelfItemRowNameProps<TData> {
  row: Row<TData>;
}

export function ShelfItemRowName<TData>({ row }: ShelfItemRowNameProps<TData>) {
  const item = ShelfItemSchema.parse(row.original);
  const dialog = useDialog();

  return (
    <>
      <Button
        className="flex items-center space-x-2"
        variant="link"
        onClick={() => {
          dialog.props.onOpenChange(true);
        }}
      >
        {item.name}
      </Button>
      <Dialog {...dialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <ShelfItemForm
            shelfItem={item}
            onOpenChange={dialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
