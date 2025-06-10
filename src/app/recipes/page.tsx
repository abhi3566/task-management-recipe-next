"use client";

import { RecipeProvider } from "@/components/recipe/recipe-provider";
import { RecipeApp } from "@/components/recipe/recipe-app";
import Link from "next/link";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecipesPage() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Recipe Finder</h1>
            <p className="text-muted-foreground">Explore meals using Tanstack Query</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ListTodo className="h-4 w-4" />
              <span>Back to Tasks</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="h-[calc(100vh-180px)]">
        <RecipeProvider>
          <RecipeApp />
        </RecipeProvider>
      </main>
    </div>
  );
}
