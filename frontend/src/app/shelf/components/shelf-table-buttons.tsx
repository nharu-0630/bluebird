"use client";

import { useDialog } from "@/components/extension/use-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShelfItemCreateForm } from "./shelf-item-create-form";

export function ShelfTableButtons() {
  const shelfItemCreateDialog = useDialog();

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
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
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
