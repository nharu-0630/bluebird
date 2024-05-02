"use client";

import { ShelfTag } from "@/app/shelf/schema/shelf-tag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  GetShelfItemsDocument,
  GetShelfTagsDocument,
  UpdateShelfTagDocument,
  UpdateShelfTagMutation,
  UpdateShelfTagMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ShelfTagEditFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
});

type ShelfTagEditForm = z.infer<typeof ShelfTagEditFormSchema>;

interface ShelfTagEditDialogProps {
  shelfTag: ShelfTag;
  onOpenChange: (value: boolean) => void;
}

export function ShelfTagEditForm(props: ShelfTagEditDialogProps) {
  const form = useForm<ShelfTagEditForm>({
    resolver: zodResolver(ShelfTagEditFormSchema),
    mode: "onBlur",
    defaultValues: {
      ulid: props.shelfTag.ulid,
      name: props.shelfTag.name,
    },
  });
  const [
    updateShelfTag,
    { loading: updateShelfTagLoading, error: updateShelfTagError },
  ] = useMutation<UpdateShelfTagMutation, UpdateShelfTagMutationVariables>(
    UpdateShelfTagDocument,
    {
      refetchQueries: [
        { query: GetShelfItemsDocument },
        { query: GetShelfTagsDocument },
      ],
    }
  );
  const { toast } = useToast();

  function onSubmit(data: ShelfTagEditForm) {
    updateShelfTag({
      variables: {
        ulid: data.ulid,
        name: data.name,
      },
    });
    props.onOpenChange(false);
    toast({
      title: "タグを変更しました",
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
        <Button type="submit">変更</Button>
      </form>
    </Form>
  );
}
