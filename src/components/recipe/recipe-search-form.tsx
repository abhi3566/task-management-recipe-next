"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import * as z from "zod";
import { useRecipeStore } from "@/store/recipe-store";
import { searchFormSchema } from "@/types/recipe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export function RecipeSearchForm() {
  const setSearchQuery = useRecipeStore((state) => state.setSearchQuery);
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { query: useRecipeStore.getState().searchQuery },
  });

  const onSubmit = (data: z.infer<typeof searchFormSchema>) => {
    setSearchQuery(data.query);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto">
        <div className="flex items-center gap-2 bg-card p-2 rounded-lg shadow-sm">
          <Search className="text-muted-foreground h-5 w-5" />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search for recipes (e.g., 'Pasta')"
                    className="w-full border-0 bg-transparent focus:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="bg-amber-500 hover:bg-amber-600">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
