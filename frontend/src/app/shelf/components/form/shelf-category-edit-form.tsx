"use client";

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
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import ShelfCategoryTable from "../shelf-category-table";

const shelfItemEditFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string().length(26, { message: "Must be 26 characters" }),
  tags: z.array(z.string().length(26, { message: "Must be 26 characters" })),
  location: z.string().length(26, { message: "Must be 26 characters" }),
  description: z.string().optional(),
});

type ShelfItemEditForm = z.infer<typeof shelfItemEditFormSchema>;

interface ShelfCategoryEditDialogProps {
  onOpenChange: (value: boolean) => void;
}

export function ShelfCategoryEditForm(props: ShelfCategoryEditDialogProps) {
  const form = useForm<ShelfItemEditForm>({
    resolver: zodResolver(shelfItemEditFormSchema),
    mode: "onBlur",
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
    updateShelfItem,
    { loading: updateShelfItemLoading, error: updateShelfItemError },
  ] = useMutation<UpdateShelfItemMutation, UpdateShelfItemMutationVariables>(
    UpdateShelfItemDocument
  );

  if (categoryLoading || tagsLoading || locationLoading) return null;
  if (categoryError || tagsError || locationError) return null;

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
    if (!updateShelfItemLoading) {
      props.onOpenChange(false);
    }
  }

  return (
    <>
      <ShelfCategoryTable />
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
          <Button type="submit">変更</Button>
        </form>
      </Form>
    </>
  );
}
