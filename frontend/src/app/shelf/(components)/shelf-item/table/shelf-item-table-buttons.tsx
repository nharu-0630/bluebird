"use client";

import { useDialog } from "@/components/extension/use-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeletedShelfItemForm } from "../../deleted-shelf-item/form/deleted-shelf-item-form";
import { ShelfCategoryForm } from "../../shelf-category/form/shelf-category-form";
import { ShelfLocationForm } from "../../shelf-location/form/shelf-location-form";
import { ShelfTagForm } from "../../shelf-tag/form/shelf-tag-form";
import { ShelfItemCreateForm } from "../form/shelf-item-create-form";

export function ShelfItemTableButtons() {
  const shelfItemCreateDialog = useDialog();
  const shelfCategoryEditDialog = useDialog();
  const shelfTagEditDialog = useDialog();
  const shelfLocationEditDialog = useDialog();
  const deletedShelfItemDialog = useDialog();

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={shelfItemCreateDialog.trigger}>アイテムを追加</Button>
      <Dialog {...shelfItemCreateDialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <DialogTitle>アイテム</DialogTitle>
          <ShelfItemCreateForm
            onOpenChange={shelfItemCreateDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">編集</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={shelfCategoryEditDialog.trigger}>
            カテゴリ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shelfTagEditDialog.trigger}>
            タグ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shelfLocationEditDialog.trigger}>
            保管場所
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={deletedShelfItemDialog.trigger} variant={"outline"}>
        復元
      </Button>
      <Dialog {...shelfCategoryEditDialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <DialogTitle>カテゴリ</DialogTitle>
          <ShelfCategoryForm
            onOpenChange={shelfCategoryEditDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Dialog {...shelfTagEditDialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <DialogTitle>タグ</DialogTitle>
          <ShelfTagForm onOpenChange={shelfTagEditDialog.props.onOpenChange} />
        </DialogContent>
      </Dialog>
      <Dialog {...shelfLocationEditDialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <DialogTitle>保管場所</DialogTitle>
          <ShelfLocationForm
            onOpenChange={shelfLocationEditDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Dialog {...deletedShelfItemDialog.props}>
        <DialogContent className="lg:max-w-screen-lg md:max-w-screen-md max-w-[90vw] max-h-[90vh] overflow-y-scroll">
          <DialogTitle>削除済みのアイテム</DialogTitle>
          <DeletedShelfItemForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
