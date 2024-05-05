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
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
  GetShelfItemsDocument,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
  GetShelfTagsDocument,
  GetShelfTagsQuery,
  UpdateShelfItemDocument,
  UpdateShelfItemMutation,
  UpdateShelfItemMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfItem } from "../../../schema/shelf-item";

const ShelfItemEditFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string().length(26, { message: "Must be 26 characters" }),
  tags: z.array(z.string().length(26, { message: "Must be 26 characters" })),
  location: z.string().length(26, { message: "Must be 26 characters" }),
  description: z.string().optional(),
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

  function onSubmit(data: ShelfItemEditForm) {
    updateShelfItem({
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

  return (
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
        <Button type="submit">変更</Button>
      </form>
    </Form>
  );
}
