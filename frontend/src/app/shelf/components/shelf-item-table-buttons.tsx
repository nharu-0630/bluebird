"use client";

import { useDialog } from "@/components/extension/use-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShelfCategoryEditForm } from "./form/shelf-category-edit-form";
import { ShelfItemCreateForm } from "./form/shelf-item-create-form";

export function ShelfItemTableButtons() {
  const shelfItemCreateDialog = useDialog();
  const shelfCategoryEditDialog = useDialog();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Button onClick={shelfItemCreateDialog.trigger}>アイテムを追加</Button>
        <Dialog {...shelfItemCreateDialog.props}>
          <DialogContent>
            <ShelfItemCreateForm
              onOpenChange={shelfItemCreateDialog.props.onOpenChange}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>カテゴリを編集</Button>
          </DialogTrigger>
          <DialogContent>
            <ShelfCategoryEditForm
              onOpenChange={shelfCategoryEditDialog.props.onOpenChange}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>タグを編集</Button>
          </DialogTrigger>
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>保管場所を編集</Button>
          </DialogTrigger>
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
