"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  GetShelfCategoriesDocument,
  GetShelfCategoriesQuery,
  GetShelfLocationsDocument,
  GetShelfLocationsQuery,
  GetShelfTagsDocument,
  GetShelfTagsQuery,
} from "@/gql/gen/client/graphql";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ulid } from "ulid";
import { z } from "zod";

const shelfItemFormSchema = z.object({
  ulid: z.string().length(26, { message: "Must be 26 characters" }),
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  category: z.string().length(26, { message: "Must be 26 characters" }),
  tags: z.array(z.string().length(26, { message: "Must be 26 characters" })),
  location: z.string().length(26, { message: "Must be 26 characters" }),
  description: z.string().optional(),
});

type ShelfItemFormValues = z.infer<typeof shelfItemFormSchema>;

export function ShelfItemForm() {
  const form = useForm<ShelfItemFormValues>({
    resolver: zodResolver(shelfItemFormSchema),
    mode: "onBlur",
    defaultValues: {
      ulid: ulid(),
      name: "",
      category: "",
      tags: [],
      location: "",
      description: "",
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

  if (categoryLoading || tagsLoading || locationLoading) return null;
  if (categoryError || tagsError || locationError) return null;

  function onSubmit(data: ShelfItemFormValues) {
    console.log(data);
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
                <div className="flex w-full items-center space-x-2">
                  <Input placeholder="ULID" {...field} />
                  <Button onClick={() => field.onChange(ulid())}>
                    Generate
                  </Button>
                </div>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Category</SelectLabel> */}
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
              <FormDescription>The category of the item.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiSelector
                  onValuesChange={field.onChange}
                  values={field.value ?? []}
                  loop
                  className="w-full"
                  displayValues={[]}
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select tags" />
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
              <FormDescription>The tags of the item.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Location</SelectLabel> */}
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
              <FormDescription>The location of the item.</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>The description of the item.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
