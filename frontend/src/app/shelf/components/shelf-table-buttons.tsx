import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShelfItemCreateForm } from "./shelf-item-create-form";

export function ShelfTableButtons() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>アイテムを追加</Button>
          </DialogTrigger>
          <DialogContent>
            <ShelfItemCreateForm />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>カテゴリを追加</Button>
          </DialogTrigger>
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>タグを追加</Button>
          </DialogTrigger>
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>保管場所を追加</Button>
          </DialogTrigger>
          <DialogContent>{/* <ShelfItemAddForm /> */}</DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
