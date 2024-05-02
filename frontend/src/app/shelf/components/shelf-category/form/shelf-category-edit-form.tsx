"use client";

import { ShelfCategory } from "@/app/shelf/schema/shelf-category";
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
  UpdateShelfCategoryDocument,
  UpdateShelfCategoryMutation,
  UpdateShelfCategoryMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ShelfCategoryEditFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
});

type ShelfCategoryEditForm = z.infer<typeof ShelfCategoryEditFormSchema>;

interface ShelfCategoryEditDialogProps {
  shelfCategory: ShelfCategory;
  onOpenChange: (value: boolean) => void;
}

export function ShelfCategoryEditForm(props: ShelfCategoryEditDialogProps) {
  const form = useForm<ShelfCategoryEditForm>({
    resolver: zodResolver(ShelfCategoryEditFormSchema),
    mode: "onBlur",
    defaultValues: {
      ulid: props.shelfCategory.ulid,
      name: props.shelfCategory.name,
    },
  });

  const [
    updateShelfCategory,
    { loading: updateShelfCategoryLoading, error: updateShelfCategoryError },
  ] = useMutation<
    UpdateShelfCategoryMutation,
    UpdateShelfCategoryMutationVariables
  >(UpdateShelfCategoryDocument, {
    refetchQueries: [{ query: GetShelfCategoriesDocument }],
  });

  function onSubmit(data: ShelfCategoryEditForm) {
    updateShelfCategory({
      variables: {
        ulid: data.ulid,
        name: data.name,
      },
    });
    if (!updateShelfCategoryLoading) {
      props.onOpenChange(false);
    }
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
        <Button type="submit">変更</Button>
      </form>
    </Form>
  );
}
