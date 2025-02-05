"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { LoadingPage } from "@/components/loading-page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  AddShelfItemImageDocument,
  AddShelfItemImageMutation,
  AddShelfItemImageMutationVariables,
  GetShelfItemsDocument,
  RemoveShelfItemImageDocument,
  RemoveShelfItemImageMutation,
  RemoveShelfItemImageMutationVariables,
  UpdateShelfItemDocument,
  UpdateShelfItemMutation,
  UpdateShelfItemMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShelfItem } from "../../../(schema)/shelf-item";

const ShelfItemEditFormSchema = z.object({
  ulid: z.string(),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string(),
  tags: z.array(z.string()),
  location: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()),
});

type ShelfItemEditForm = z.infer<typeof ShelfItemEditFormSchema>;

interface ShelfItemEditDialogProps {
  shelfItem: ShelfItem;
  onOpenChange: (value: boolean) => void;
}

export function ShelfItemEditForm(props: ShelfItemEditDialogProps) {
  const [images, setImages] = useState(props.shelfItem.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const form = useForm<ShelfItemEditForm>({
    resolver: zodResolver(ShelfItemEditFormSchema),
    mode: "onBlur",
    defaultValues: {
      ulid: props.shelfItem.ulid,
      name: props.shelfItem.name,
      category: props.shelfItem.category.ulid,
      tags: props.shelfItem.tags.map((tag) => tag.ulid),
      location: props.shelfItem.location.ulid,
      description: props.shelfItem.description,
      images: props.shelfItem.images.map((image) => image.ulid),
    },
  });

  const [
    updateShelfItem,
    { loading: updateShelfItemLoading, error: updateShelfItemError },
  ] = useMutation<UpdateShelfItemMutation, UpdateShelfItemMutationVariables>(
    UpdateShelfItemDocument,
    {
      refetchQueries: [{ query: GetShelfItemsDocument }],
    }
  );
  const [
    addShelfItemImage,
    { loading: addShelfItemImageLoading, error: addShelfItemImageError },
  ] = useMutation<
    AddShelfItemImageMutation,
    AddShelfItemImageMutationVariables
  >(AddShelfItemImageDocument, {
    refetchQueries: [{ query: GetShelfItemsDocument }],
  });
  const [
    removeShelfItemImage,
    { loading: removeShelfItemImageLoading, error: removeShelfItemImageError },
  ] = useMutation<
    RemoveShelfItemImageMutation,
    RemoveShelfItemImageMutationVariables
  >(RemoveShelfItemImageDocument, {
    refetchQueries: [{ query: GetShelfItemsDocument }],
  });

  const { toast } = useToast();

  async function onSubmit(data: ShelfItemEditForm) {
    for (const fileUlid of imagesToRemove) {
      await removeShelfItemImage({
        variables: {
          ulid: props.shelfItem.ulid,
          fileUlid: fileUlid,
        },
      });
    }

    await updateShelfItem({
      variables: {
        ulid: data.ulid,
        name: data.name,
        categoryUlid: data.category,
        tagsUlid: data.tags,
        locationUlid: data.location,
        description: data.description ?? "",
      },
    });

    for (const file of newImages) {
      await addShelfItemImage({
        variables: {
          ulid: props.shelfItem.ulid,
          file: file,
        },
      });
    }

    props.onOpenChange(false);
    toast({
      title: "アイテムを変更しました",
      description: data.ulid,
    });
  }

  function handleAddImage(files: FileList | null) {
    if (files) {
      const newLoadingImages = [];
      for (let i = 0; i < files.length; i++) {
        const tempUlid = URL.createObjectURL(files[i]);
        newLoadingImages.push(tempUlid);
        setNewImages((prev) => [...prev, files[i]]);
      }
    }
  }

  function handleRemoveImage(fileUlid: string) {
    setImagesToRemove((prev) => [...prev, fileUlid]);
    const updatedImages = images.filter((image) => image.ulid !== fileUlid);
    setImages(updatedImages);
    form.setValue(
      "images",
      updatedImages.map((image) => image.ulid)
    );
  }

  if (
    updateShelfItemLoading ||
    addShelfItemImageLoading ||
    removeShelfItemImageLoading
  ) {
    return <LoadingPage />;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ulid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ULID</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>カテゴリ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            key={props.shelfItem.category.ulid}
                            value={props.shelfItem.category.ulid}
                          >
                            {props.shelfItem.category.name}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タグ</FormLabel>
                <FormControl>
                  <MultiSelector
                    onValuesChange={field.onChange}
                    values={field.value}
                    displayValues={
                      field.value
                        .map(
                          (tag) =>
                            props.shelfItem.tags.find((t) => t.ulid === tag)
                              ?.name
                        )
                        .filter(
                          (item): item is Exclude<typeof item, undefined> =>
                            item !== undefined
                        ) ?? []
                    }
                    onDisplayValuesChange={() => {}}
                    loop
                    className="w-full"
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {props.shelfItem.tags.map((tag) => (
                          <MultiSelectorItem
                            key={tag.ulid}
                            value={tag.ulid}
                            displayValue={tag.name}
                          >
                            {tag.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>保管場所</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            key={props.shelfItem.location.ulid}
                            value={props.shelfItem.location.ulid}
                          >
                            {props.shelfItem.location.name}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>詳細</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>画像</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {images.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Image
                          src={image.signedUrl}
                          width={100}
                          height={100}
                          alt={image.originalName}
                          unoptimized
                        />
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveImage(image.ulid)}
                        >
                          削除
                        </Button>
                      </div>
                    ))}
                    {newImages.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Image
                          src={URL.createObjectURL(file)}
                          width={100}
                          height={100}
                          alt={file.name}
                          unoptimized
                        />
                        <Button
                          variant="destructive"
                          onClick={() =>
                            setNewImages((prev) =>
                              prev.filter((img) => img !== file)
                            )
                          }
                        >
                          削除
                        </Button>
                      </div>
                    ))}
                    <Input
                      type="file"
                      multiple
                      onChange={({ target: { validity, files } }) => {
                        if (validity.valid) handleAddImage(files);
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">変更</Button>
        </form>
      </Form>
    </>
  );
}
