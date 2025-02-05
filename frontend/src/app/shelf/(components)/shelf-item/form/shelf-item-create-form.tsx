"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  CreateShelfItemDocument,
  CreateShelfItemMutation,
  CreateShelfItemMutationVariables,
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
  GetShelfItemsDocument,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
  GetShelfTagsDocument,
  GetShelfTagsQuery,
} from "@/gql/gen/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";

const ShelfItemCreateFormSchema = z.object({
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string(),
  tags: z.array(z.string()),
  location: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()),
});

type ShelfItemCreateForm = z.infer<typeof ShelfItemCreateFormSchema>;

interface ShelfItemCreateDialogProps {
  onOpenChange: (value: boolean) => void;
}

export function ShelfItemCreateForm(props: ShelfItemCreateDialogProps) {
  const [newImages, setNewImages] = useState<File[]>([]);
  const form = useForm<ShelfItemCreateForm>({
    resolver: zodResolver(ShelfItemCreateFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      category: "",
      tags: [],
      location: "",
      description: "",
      images: [],
    },
  });
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetShelfCategoriesQuery>(GetShelfCategoriesDocument);
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery<GetShelfTagsQuery>(GetShelfTagsDocument);
  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useQuery<GetShelfLocationsQuery>(GetShelfLocationsDocument);
  const [
    createShelfItem,
    { loading: createShelfItemLoading, error: createShelfItemError },
  ] = useMutation<CreateShelfItemMutation, CreateShelfItemMutationVariables>(
    CreateShelfItemDocument,
    {
      refetchQueries: [{ query: GetShelfItemsDocument }],
    }
  );
  const [addShelfItemImage] = useMutation<
    AddShelfItemImageMutation,
    AddShelfItemImageMutationVariables
  >(AddShelfItemImageDocument, {
    refetchQueries: [{ query: GetShelfItemsDocument }],
  });

  const { toast } = useToast();

  if (categoryLoading || tagsLoading || locationLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (categoryError || tagsError || locationError)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {categoryError?.message ??
            tagsError?.message ??
            locationError?.message ??
            "エラーが発生しました"}
        </AlertDescription>
      </Alert>
    );

  async function onSubmit(data: ShelfItemCreateForm) {
    const response = await createShelfItem({
      variables: {
        name: data.name,
        categoryUlid: data.category,
        tagsUlid: data.tags,
        locationUlid: data.location,
        description: data.description ?? "",
      },
    });

    const shelfItemUlid = response.data?.createShelfItem.ulid;

    if (shelfItemUlid) {
      for (const file of newImages) {
        await addShelfItemImage({
          variables: {
            ulid: shelfItemUlid,
            file: file,
          },
        });
      }
    }

    props.onOpenChange(false);
    toast({
      title: "アイテムを追加しました",
      description: data.name,
    });
  }

  function handleAddImage(files: FileList | null) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        setNewImages((prev) => [...prev, files[i]]);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        {categoryData?.shelfCategories.map((category) => (
                          <SelectItem key={category.ulid} value={category.ulid}>
                            {category.name}
                          </SelectItem>
                        ))}
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
                  values={field.value ?? []}
                  displayValues={
                    field.value
                      .map(
                        (tag) =>
                          tagsData?.shelfTags.find((t) => t.ulid === tag)?.name
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
                      {tagsData?.shelfTags.map((tag) => (
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
                        {locationData?.shelfLocations.map((location) => (
                          <SelectItem key={location.ulid} value={location.ulid}>
                            {location.name}
                          </SelectItem>
                        ))}
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
        <Button type="submit">追加</Button>
      </form>
    </Form>
  );
}
