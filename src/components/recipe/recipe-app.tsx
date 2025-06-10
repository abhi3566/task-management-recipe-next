"use client";

import { ChefHat, Flame } from 'lucide-react';
import { RecipeSearchForm } from './recipe-search-form';
import { RecipeTable } from './recipe-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function RecipeApp() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-gradient-to-r from-amber-500 to-orange-600 py-8 px-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative mr-3 animate-bounce-slow">
              <ChefHat className="h-12 w-12 text-white" />
              <Flame className="h-5 w-5 text-red-500 absolute -bottom-1 right-0 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Recipe Finder</h1>
              <p className="text-amber-100">Discover delicious meals to cook</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="secondary" className="gap-2 shadow-sm hover:shadow-md transition-all">
              <span>Back to Tasks</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <RecipeSearchForm />
        <RecipeTable />
      </main>
      
      <footer className="text-center py-6 bg-muted/40 text-muted-foreground">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChefHat className="h-5 w-5" />
            <span className="font-medium">Recipe Finder</span>
          </div>
          <p className="text-sm">Powered by TheMealDB API, Next.js, and Tanstack Query</p>
        </div>
      </footer>
    </div>
  );
}
