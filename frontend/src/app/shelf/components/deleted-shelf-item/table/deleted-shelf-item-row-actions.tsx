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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  ForceDeleteShelfItemDocument,
  ForceDeleteShelfItemMutation,
  ForceDeleteShelfItemMutationVariables,
  GetDeletedShelfItemsDocument,
  GetShelfItemsDocument,
  RestoreShelfItemDocument,
  RestoreShelfItemMutation,
  RestoreShelfItemMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { ShelfItemSchema } from "../../../schema/shelf-item";

interface DeletedShelfItemRowActionsProps<TData> {
  row: Row<TData>;
}

export function DeletedShelfItemRowActions<TData>({
  row,
}: DeletedShelfItemRowActionsProps<TData>) {
  const item = ShelfItemSchema.parse(row.original);

  const restoreDialog = useDialog();
  const forceDeleteDialog = useDialog();
  const [
    restoreShelfItem,
    { loading: restoreShelfItemLoading, error: restoreShelfItemError },
  ] = useMutation<RestoreShelfItemMutation, RestoreShelfItemMutationVariables>(
    RestoreShelfItemDocument,
    {
      refetchQueries: [
        { query: GetShelfItemsDocument },
        {
          query: GetDeletedShelfItemsDocument,
        },
      ],
    }
  );
  const [
    forceDeleteShelfItem,
    { loading: forceDeleteShelfItemLoading, error: forceDeleteShelfItemError },
  ] = useMutation<
    ForceDeleteShelfItemMutation,
    ForceDeleteShelfItemMutationVariables
  >(ForceDeleteShelfItemDocument, {
    refetchQueries: [
      { query: GetShelfItemsDocument },
      {
        query: GetDeletedShelfItemsDocument,
      },
    ],
  });
  const { toast } = useToast();

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
          <DropdownMenuItem onClick={restoreDialog.trigger}>
            復元
          </DropdownMenuItem>
          <DropdownMenuItem onClick={forceDeleteDialog.trigger}>
            完全に削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog {...restoreDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アイテムを復元しますか？</DialogTitle>
            <DialogDescription>アイテムを復元します。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                restoreDialog.props.onOpenChange(false);
              }}
              variant={"outline"}
            >
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                await restoreShelfItem({ variables: { ulid: item.ulid } });
                restoreDialog.props.onOpenChange(false);
                toast({
                  title: "アイテムを復元しました",
                  description: item.location.ulid,
                });
              }}
            >
              復元
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog {...forceDeleteDialog.props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アイテムを完全に削除しますか？</DialogTitle>
            <DialogDescription>
              アイテムを完全に削除します。この操作を元に戻すことはできません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                forceDeleteDialog.props.onOpenChange(false);
              }}
              variant={"outline"}
            >
              キャンセル
            </Button>
            <Button
              onClick={async () => {
                await forceDeleteShelfItem({ variables: { ulid: item.ulid } });
                forceDeleteDialog.props.onOpenChange(false);
                toast({
                  variant: "destructive",
                  title: "アイテムを完全に削除しました",
                  description: item.ulid,
                });
              }}
              variant={"destructive"}
            >
              完全に削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
