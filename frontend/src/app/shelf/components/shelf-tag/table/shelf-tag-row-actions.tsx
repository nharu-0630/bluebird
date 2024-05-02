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
  DeleteShelfItemMutation,
  DeleteShelfItemMutationVariables,
  DeleteShelfTagDocument,
  GetShelfTagsDocument,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { ShelfTagSchema } from "../../../schema/shelf-tag";
import { ShelfTagEditForm } from "../form/shelf-tag-edit-form";

interface ShelfTagRowActionsProps<TData> {
  row: Row<TData>;
}

export function ShelfTagRowActions<TData>({
  row,
}: ShelfTagRowActionsProps<TData>) {
  const item = ShelfTagSchema.parse(row.original);

  const editDialog = useDialog();
  const deleteDialog = useDialog();
  const [
    deleteShelfTag,
    { loading: deleteShelfTagLoading, error: deleteShelfTagError },
  ] = useMutation<DeleteShelfItemMutation, DeleteShelfItemMutationVariables>(
    DeleteShelfTagDocument,
    {
      refetchQueries: [{ query: GetShelfTagsDocument }],
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
            onClick={() => navigator.clipboard.writeText(item.ulid)}
          >
            ULIDをコピー
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog {...editDialog.props}>
        <DialogContent>
          <ShelfTagEditForm
            shelfTag={item}
            onOpenChange={editDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Dialog {...deleteDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タグを削除しますか？</DialogTitle>
            <DialogDescription>
              タグを削除します。この操作を元に戻すことはできません。
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
                await deleteShelfTag({ variables: { ulid: item.ulid } });
                if (!deleteShelfTagLoading) {
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
