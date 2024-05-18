"use client";

import { ShelfCategorySchema } from "@/app/shelf/(schema)/shelf-category";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  CreateShelfCategoryDocument,
  CreateShelfCategoryMutation,
  CreateShelfCategoryMutationVariables,
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
} from "@/gql/gen/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfCategoryColumns } from "../table/shelf-category-columns";
import { ShelfCategoryTable } from "../table/shelf-category-table";

const ShelfCategoryCreateFormSchema = z.object({
  name: z.string().min(1, { message: "Must be at least 1 character" }),
});

type ShelfCategoryCreateForm = z.infer<typeof ShelfCategoryCreateFormSchema>;

interface ShelfCategoryEditDialogProps {
  onOpenChange: (value: boolean) => void;
}

export function ShelfCategoryForm(props: ShelfCategoryEditDialogProps) {
  const { data, loading, error } = useQuery<GetShelfCategoriesQuery>(
    GetShelfCategoriesDocument
  );
  const form = useForm<ShelfCategoryCreateForm>({
    resolver: zodResolver(ShelfCategoryCreateFormSchema),
    mode: "onBlur",
  });
  const [
    createShelfCategory,
    { loading: createShelfCategoryLoading, error: createShelfCategoryError },
  ] = useMutation<
    CreateShelfCategoryMutation,
    CreateShelfCategoryMutationVariables
  >(CreateShelfCategoryDocument, {
    refetchQueries: [{ query: GetShelfCategoriesDocument }],
  });
  const { toast } = useToast();
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (error)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  const categories = z
    .array(ShelfCategorySchema)
    .parse(data?.shelfCategories ?? []);

  function onSubmit(data: ShelfCategoryCreateForm) {
    createShelfCategory({
      variables: {
        name: data.name,
      },
    });
    toast({
      title: "カテゴリを作成しました",
      description: data.name,
    });
  }

  return (
    <>
      <div className="mb-4">
        <ShelfCategoryTable columns={ShelfCategoryColumns} data={categories} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-1 items-end space-x-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">追加</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
