"use client";

import { ShelfLocation } from "@/app/shelf/(schema)/shelf-location";
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
  GetShelfLocationsDocument,
  UpdateShelfLocationDocument,
  UpdateShelfLocationMutation,
  UpdateShelfLocationMutationVariables,
} from "@/gql/gen/graphql";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ShelfLocationEditFormSchema = z.object({
  ulid: z.string(),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
});

type ShelfLocationEditForm = z.infer<typeof ShelfLocationEditFormSchema>;

interface ShelfLocationEditDialogProps {
  shelfLocation: ShelfLocation;
  onOpenChange: (value: boolean) => void;
}

export function ShelfLocationEditForm(props: ShelfLocationEditDialogProps) {
  const form = useForm<ShelfLocationEditForm>({
    resolver: zodResolver(ShelfLocationEditFormSchema),
    mode: "onBlur",
    defaultValues: {
      ulid: props.shelfLocation.ulid,
      name: props.shelfLocation.name,
    },
  });
  const [
    updateShelfLocation,
    { loading: updateShelfLocationLoading, error: updateShelfLocationError },
  ] = useMutation<
    UpdateShelfLocationMutation,
    UpdateShelfLocationMutationVariables
  >(UpdateShelfLocationDocument, {
    refetchQueries: [
      { query: GetShelfItemsDocument },
      { query: GetShelfLocationsDocument },
    ],
  });
  const { toast } = useToast();

  function onSubmit(data: ShelfLocationEditForm) {
    updateShelfLocation({
      variables: {
        ulid: data.ulid,
        name: data.name,
      },
    });
    props.onOpenChange(false);
    toast({
      title: "保管場所を変更しました",
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
