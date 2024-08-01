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
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
  GetShelfItemsDocument,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
  GetShelfTagsDocument,
  GetShelfTagsQuery,
  RemoveShelfItemImageDocument,
  RemoveShelfItemImageMutation,
  RemoveShelfItemImageMutationVariables,
  UpdateShelfItemDocument,
  UpdateShelfItemMutation,
  UpdateShelfItemMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfItem } from "../../../(schema)/shelf-item";

const ShelfItemEditFormSchema = z.object({
  ulid: z.string(),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string(),
  tags: z.array(z.string()),
  location: z.string(),
  description: z.string().optional(),
  images: z.array(
    z.object({
      bucket: z.string(),
      key: z.string(),
      name: z.string(),
      signedUrl: z.string(),
    })
  ),
});

type ShelfItemEditForm = z.infer<typeof ShelfItemEditFormSchema>;

interface ShelfItemEditDialogProps {
  shelfItem: ShelfItem;
  onOpenChange: (value: boolean) => void;
}

export function ShelfItemEditForm(props: ShelfItemEditDialogProps) {
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
      images: props.shelfItem.images,
    },
  });
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<GetShelfCategoriesQuery>(GetShelfCategoriesDocument);
  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery<GetShelfTagsQuery>(GetShelfTagsDocument);
  const {
    data: locationData,
    loading: locationLoading,
    error: locationError,
  } = useQuery<GetShelfLocationsQuery>(GetShelfLocationsDocument);
  const [
    updateShelfItem,
    { loading: updateShelfItemLoading, error: updateShelfItemError },
  ] = useMutation<UpdateShelfItemMutation, UpdateShelfItemMutationVariables>(
    UpdateShelfItemDocument,
    {
      refetchQueries: [{ query: GetShelfItemsDocument }],
    }
  );
  const [addShelfItemImage] = useMutation<
    AddShelfItemImageMutation,
    AddShelfItemImageMutationVariables
  >(AddShelfItemImageDocument);
  const [removeShelfItemImage] = useMutation<
    RemoveShelfItemImageMutation,
    RemoveShelfItemImageMutationVariables
  >(RemoveShelfItemImageDocument);

  const { toast } = useToast();

  if (categoryLoading || tagLoading || locationLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (categoryError || tagError || locationError)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {categoryError?.message ??
            tagError?.message ??
            locationError?.message ??
            "エラーが発生しました"}
        </AlertDescription>
      </Alert>
    );

  async function onSubmit(data: ShelfItemEditForm) {
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
    props.onOpenChange(false);
    toast({
      title: "アイテムを変更しました",
      description: data.ulid,
    });
  }

  async function handleAddImage(files: FileList | null) {
    if (files) {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const response = await addShelfItemImage({
          variables: {
            ulid: props.shelfItem.ulid,
            file: files[i],
          },
        });
        if (response.data) {
          newImages.push(response.data.addShelfItemImage);
        }
      }
      form.setValue("images", [...form.getValues("images"), ...newImages]);
    }
  }

  async function handleRemoveImage(imageKey: string) {
    await removeShelfItemImage({
      variables: {
        ulid: props.shelfItem.ulid,
        fileKey: imageKey,
      },
    });
    form.setValue(
      "images",
      form.getValues("images").filter((image) => image.key !== imageKey)
    );
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
                          {categoryData?.shelfCategories.map((category) => (
                            <SelectItem
                              key={category.ulid}
                              value={category.ulid}
                            >
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
                    values={field.value}
                    displayValues={
                      field.value
                        .map(
                          (tag) =>
                            tagData?.shelfTags.find((t) => t.ulid === tag)?.name
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
                        {tagData?.shelfTags.map((tag) => (
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
                            <SelectItem
                              key={location.ulid}
                              value={location.ulid}
                            >
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
                    {field.value.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Image
                          src={image.signedUrl}
                          width={100}
                          height={100}
                          alt={image.name}
                        />
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleRemoveImage(
                              image.bucket +
                                "/" +
                                image.key +
                                "/" +
                                props.shelfItem.ulid +
                                "/" +
                                image.name
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
