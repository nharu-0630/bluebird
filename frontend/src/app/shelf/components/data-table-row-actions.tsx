"use client";

import { Button } from "@/components/ui/button";

import { useDialog } from "@/components/extension/use-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  DeleteShelfItemDocument,
  DeleteShelfItemMutation,
  DeleteShelfItemMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { QRCodeSVG } from "qrcode.react";
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
  const deleteDialog = useDialog();
  const qrCodeDialog = useDialog();

  const [
    deleteShelfItem,
    { loading: deleteShelfItemLoading, error: deleteShelfItemError },
  ] = useMutation<DeleteShelfItemMutation, DeleteShelfItemMutationVariables>(
    DeleteShelfItemDocument
  );

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
          <DropdownMenuItem onClick={deleteDialog.trigger}>
            削除
          </DropdownMenuItem>
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
          <ShelfItemEditForm
            onOpenChange={editDialog.props.onOpenChange}
            shelfItem={shelf}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog {...deleteDialog.props}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アイテムを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              アイテムを削除します。この操作を元に戻すことはできません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>中止</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteShelfItem({ variables: { ulid: shelf.ulid } });
                deleteDialog.props.onOpenChange(false);
              }}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog {...qrCodeDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QRコード</DialogTitle>
            <DialogDescription>
              <QRCodeSVG value={"https://nharu.dev/shelf/i/" + shelf.ulid} />,
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
