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
import { useToast } from "@/components/ui/use-toast";
import {
  DeleteShelfItemDocument,
  DeleteShelfItemMutation,
  DeleteShelfItemMutationVariables,
  GetDeletedShelfItemsDocument,
  GetShelfItemsDocument,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { QRCodeSVG } from "qrcode.react";
import { ShelfItemSchema } from "../../../(schema)/shelf-item";
import { ShelfItemEditForm } from "../form/shelf-item-edit-form";

interface ShelfItemRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShelfItemRowActions<TData>({
  row,
}: ShelfItemRowActionsProps<TData>) {
  const item = ShelfItemSchema.parse(row.original);

  const editDialog = useDialog();
  const deleteDialog = useDialog();
  const qrCodeDialog = useDialog();
  const locationQRCodeDialog = useDialog();
  const { toast } = useToast();
  const [
    deleteShelfItem,
    { loading: deleteShelfItemLoading, error: deleteShelfItemError },
  ] = useMutation<DeleteShelfItemMutation, DeleteShelfItemMutationVariables>(
    DeleteShelfItemDocument,
    {
      refetchQueries: [
        { query: GetShelfItemsDocument },
        {
          query: GetDeletedShelfItemsDocument,
        },
      ],
    }
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
            onClick={() => {
              navigator.clipboard.writeText(item.ulid);
              toast({
                title: "ULIDをコピーしました",
                description: item.ulid,
              });
            }}
          >
            ULIDをコピー
          </DropdownMenuItem>
          <DropdownMenuItem onClick={qrCodeDialog.trigger}>
            QRコードを表示
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(item.location.ulid);
              toast({
                title: "保管場所のULIDをコピーしました",
                description: item.location.ulid,
              });
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
            shelfItem={item}
            onOpenChange={editDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Dialog {...deleteDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アイテムを削除しますか？</DialogTitle>
            <DialogDescription>アイテムを削除します。</DialogDescription>
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
                await deleteShelfItem({ variables: { ulid: item.ulid } });
                deleteDialog.props.onOpenChange(false);
                toast({
                  variant: "destructive",
                  title: "アイテムを削除しました",
                  description: item.ulid,
                });
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
            <QRCodeSVG value={"https://nharu.dev/shelf/i/" + item.ulid} />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog {...locationQRCodeDialog.props}>
        <DialogContent>
          <div className="flex justify-center">
            <QRCodeSVG
              value={"https://nharu.dev/shelf/l/" + item.location.ulid}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
