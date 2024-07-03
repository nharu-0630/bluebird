"use client";

import { useDialog } from "@/components/extension/use-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
        <DialogContent>
          <DialogTitle>アイテム</DialogTitle>
          <ShelfItemCreateForm
            onOpenChange={shelfItemCreateDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Button onClick={shelfCategoryEditDialog.trigger} variant={"outline"}>
        カテゴリを編集
      </Button>
      <Dialog {...shelfCategoryEditDialog.props}>
        <DialogContent>
          <DialogTitle>カテゴリ</DialogTitle>
          <ShelfCategoryForm
            onOpenChange={shelfCategoryEditDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Button onClick={shelfTagEditDialog.trigger} variant={"outline"}>
        タグを編集
      </Button>
      <Dialog {...shelfTagEditDialog.props}>
        <DialogContent>
          <DialogTitle>タグ</DialogTitle>
          <ShelfTagForm onOpenChange={shelfTagEditDialog.props.onOpenChange} />
        </DialogContent>
      </Dialog>
      <Button onClick={shelfLocationEditDialog.trigger} variant={"outline"}>
        保管場所を編集
      </Button>
      <Dialog {...shelfLocationEditDialog.props}>
        <DialogContent>
          <DialogTitle>保管場所</DialogTitle>
          <ShelfLocationForm
            onOpenChange={shelfLocationEditDialog.props.onOpenChange}
          />
        </DialogContent>
      </Dialog>
      <Button onClick={deletedShelfItemDialog.trigger} variant={"outline"}>
        削除済みのアイテムを復元
      </Button>
      <Dialog {...deletedShelfItemDialog.props}>
        <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
          <DialogTitle>削除済みのアイテム</DialogTitle>
          <DeletedShelfItemForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
