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
import { ShelfCategorySchema } from "../../schema/shelf-category";

interface ShelfCategoryRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShelfCategoryRowActions<TData>({
  row,
}: ShelfCategoryRowActionsProps<TData>) {
  const shelf = ShelfCategorySchema.parse(row.original);

  const editDialog = useDialog();
  const deleteDialog = useDialog();

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
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog {...editDialog.props}>
        <DialogContent></DialogContent>
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
    </>
  );
}
