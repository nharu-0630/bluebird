"use client";

import { Button } from "@/components/ui/button";

import { useDialog } from "@/components/extension/use-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { shelfItemSchema } from "../data/schema";
import { ShelfItemEditForm } from "./shelf-item-edit-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const shelf = shelfItemSchema.parse(row.original);

  const editDialog = useDialog();
  const qrCodeDialog = useDialog();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">メニューを開く</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={editDialog.trigger}>編集</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(shelf.ulid)}
          >
            ULIDをコピー
          </DropdownMenuItem>
          <DropdownMenuItem onClick={qrCodeDialog.trigger}>
            QRコードを表示
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog {...editDialog.props}>
        <DialogContent>
          <ShelfItemEditForm />
        </DialogContent>
      </Dialog>
      <Dialog {...qrCodeDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QRコード</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
