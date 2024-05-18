"use client";

import { ShelfLocationSchema } from "@/app/shelf/(schema)/shelf-location";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  CreateShelfLocationDocument,
  CreateShelfLocationMutation,
  CreateShelfLocationMutationVariables,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
} from "@/gql/gen/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import { z } from "zod";
import { ShelfLocationColumns } from "../table/shelf-location-columns";
import { ShelfLocationTable } from "../table/shelf-location-table";

const ShelfLocationCreateFormSchema = z.object({
  name: z.string().min(1, { message: "Must be at least 1 character" }),
});

type ShelfLocationCreateForm = z.infer<typeof ShelfLocationCreateFormSchema>;

interface ShelfLocationEditDialogProps {
  onOpenChange: (value: boolean) => void;
}

export function ShelfLocationForm(props: ShelfLocationEditDialogProps) {
  const { data, loading, error } = useQuery<GetShelfLocationsQuery>(
    GetShelfLocationsDocument
  );
  const form = useForm<ShelfLocationCreateForm>({
    resolver: zodResolver(ShelfLocationCreateFormSchema),
    mode: "onBlur",
  });
  const [
    createShelfLocation,
    { loading: createShelfLocationLoading, error: createShelfLocationError },
  ] = useMutation<
    CreateShelfLocationMutation,
    CreateShelfLocationMutationVariables
  >(CreateShelfLocationDocument, {
    refetchQueries: [{ query: GetShelfLocationsDocument }],
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
  const locations = z
    .array(ShelfLocationSchema)
    .parse(data?.shelfLocations ?? []);

  function onSubmit(data: ShelfLocationCreateForm) {
    createShelfLocation({
      variables: {
        name: data.name,
      },
    });
    toast({
      title: "保管場所を作成しました",
      description: data.name,
    });
  }

  return (
    <>
      <div className="mb-4">
        <ShelfLocationTable columns={ShelfLocationColumns} data={locations} />
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
