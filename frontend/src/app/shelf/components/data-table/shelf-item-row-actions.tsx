"use client";

import { Button } from "@/components/ui/button";

import { useDialog } from "@/components/extension/use-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { ShelfItemSchema } from "../../schema/shelf-item";
import { ShelfItemEditForm } from "../form/shelf-item-edit-form";

interface ShelfItemRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShelfItemRowActions<TData>({
  row,
}: ShelfItemRowActionsProps<TData>) {
  const shelf = ShelfItemSchema.parse(row.original);

  const editDialog = useDialog();
  const deleteDialog = useDialog();
  const qrCodeDialog = useDialog();
  const locationQRCodeDialog = useDialog();

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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(shelf.location.ulid);
            }}
          >
            保管場所のULIDをコピー
          </DropdownMenuItem>
          <DropdownMenuItem onClick={locationQRCodeDialog.trigger}>
            保管場所のQRコードを表示
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
      <Dialog {...deleteDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アイテムを削除しますか？</DialogTitle>
            <DialogDescription>
              アイテムを削除します。この操作を元に戻すことはできません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                deleteDialog.props.onOpenChange(false);
              }}
              variant={"outline"}
            >
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                await deleteShelfItem({ variables: { ulid: shelf.ulid } });
                if (!deleteShelfItemLoading) {
                  deleteDialog.props.onOpenChange(false);
                }
              }}
              variant={"destructive"}
            >
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog {...qrCodeDialog.props}>
        <DialogContent>
          <div className="flex justify-center">
            <QRCodeSVG value={"https://nharu.dev/shelf/i/" + shelf.ulid} />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog {...locationQRCodeDialog.props}>
        <DialogContent>
          <div className="flex justify-center">
            <QRCodeSVG
              value={"https://nharu.dev/shelf/l/" + shelf.location.ulid}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
