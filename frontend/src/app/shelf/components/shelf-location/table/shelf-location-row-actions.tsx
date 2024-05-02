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
  DeleteShelfLocationDocument,
  DeleteShelfLocationMutation,
  DeleteShelfLocationMutationVariables,
  GetShelfLocationsDocument,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { QRCodeSVG } from "qrcode.react";
import { ShelfLocationSchema } from "../../../schema/shelf-location";
import { ShelfLocationEditForm } from "../form/shelf-location-edit-form";

interface ShelfLocationRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShelfLocationRowActions<TData>({
  row,
}: ShelfLocationRowActionsProps<TData>) {
  const item = ShelfLocationSchema.parse(row.original);

  const editDialog = useDialog();
  const deleteDialog = useDialog();
  const qrCodeDialog = useDialog();
  const [
    deleteShelfLocation,
    { loading: deleteShelfLocationLoading, error: deleteShelfLocationError },
  ] = useMutation<
    DeleteShelfLocationMutation,
    DeleteShelfLocationMutationVariables
  >(DeleteShelfLocationDocument, {
    refetchQueries: [{ query: GetShelfLocationsDocument }],
  });

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
            onClick={() => navigator.clipboard.writeText(item.ulid)}
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
          <ShelfLocationEditForm
            shelfLocation={item}
            onOpenChange={editDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Dialog {...deleteDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>カテゴリを削除しますか？</DialogTitle>
            <DialogDescription>
              カテゴリを削除します。この操作を元に戻すことはできません。
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
                await deleteShelfLocation({ variables: { ulid: item.ulid } });
                if (!deleteShelfLocationLoading) {
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
            <QRCodeSVG value={"https://nharu.dev/shelf/l/" + item.ulid} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
