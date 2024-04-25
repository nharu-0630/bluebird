"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const shelfItemFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string(),
  category: z.object({
    ulid: z.string(),
    name: z.string(),
  }),
  tags: z.array(
    z.object({
      ulid: z.string(),
      name: z.string(),
    })
  ),
  location: z.object({
    ulid: z.string(),
    name: z.string(),
  }),
  description: z.string().optional(),
});

type ShelfItemFormValues = z.infer<typeof shelfItemFormSchema>;

export function ShelfItemForm() {
  const form = useForm<ShelfItemFormValues>({
    resolver: zodResolver(shelfItemFormSchema),
    mode: "onBlur",
  });
  const { fields, append } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  function onSubmit(data: ShelfItemFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="ulid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UUID</FormLabel>
              <FormControl>
                <Input placeholder="UUID" {...field} />
              </FormControl>
              <FormDescription>
                The unique identifier for the item.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>The name of the item.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormDescription>The category of the item.</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
