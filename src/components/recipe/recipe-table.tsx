"use client";

import { useState } from "react";
import { useRecipes } from "@/hooks/use-recipes";
import { useRecipeStore } from "@/store/recipe-store";
import { combineIngredients } from "@/lib/api/recipe-api";
import { Loader2, ChefHat, AlertCircle, Heart, Globe, UtensilsCrossed } from "lucide-react";
import { Meal } from "@/types/recipe";
import { RecipeModal } from "./recipe-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RecipeTable() {
  const searchQuery = useRecipeStore((state) => state.searchQuery);
  const { data: recipes, isLoading, isError, error } = useRecipes(searchQuery);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const { favorites, toggleFavorite } = useRecipeStore();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-4">
        <div className="relative">
          <Loader2 className="h-14 w-14 animate-spin text-amber-500" />
          <UtensilsCrossed className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-600" />
        </div>
        <p className="text-lg text-muted-foreground animate-pulse">Cooking up results...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-lg shadow-md max-w-md mx-auto my-8 flex items-center">
        <AlertCircle className="h-8 w-8 mr-4 text-destructive animate-pulse" />
        <div>
          <p className="font-bold text-destructive">Recipe Error!</p>
          <p>Failed to fetch recipes: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Card className="text-center p-10 max-w-md mx-auto my-8 border-amber-200 bg-amber-50/50">
        <ChefHat className="h-16 w-16 mx-auto mb-4 text-amber-400" />
        <h3 className="text-xl font-medium mb-2">No recipes found</h3>
        <p className="text-muted-foreground mb-4">
          Try searching for different ingredients or dish names.
        </p>
        {searchQuery && (
          <p className="text-sm bg-muted/50 p-2 rounded-md inline-block">
            Search term: <span className="font-medium">{searchQuery}</span>
          </p>
        )}
      </Card>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <ChefHat className="h-6 w-6 text-amber-500" />
        Recipe Results
        {recipes.length > 0 && (
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({recipes.length} found)
          </span>
        )}
      </h2>

      <Card className="overflow-hidden border-amber-200/50">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-50 hover:bg-amber-100">
                <TableHead className="w-[300px]">Recipe</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Area</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((meal) => {
                const isFavorite = favorites.includes(meal.idMeal);
                return (
                  <TableRow 
                    key={meal.idMeal} 
                    className="recipe-card hover:bg-amber-50/50"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                        />
                        <span>{meal.strMeal}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="h-4 w-4 text-amber-500" />
                        {meal.strCategory}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        {meal.strArea}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(meal.idMeal)}
                          className={isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground"}
                        >
                          <Heart
                            className={`h-5 w-5 transition-all duration-300 ${isFavorite ? "fill-red-500 scale-110" : ""}`}
                          />
                          <span className="sr-only">
                            {isFavorite ? "Remove from favorites" : "Add to favorites"}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-amber-200 hover:border-amber-300 text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-all"
                          onClick={() => setSelectedMeal(meal)}
                        >
                          View Recipe
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          open={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
          ingredients={combineIngredients(selectedMeal)}
          isFavorite={favorites.includes(selectedMeal.idMeal)}
          onToggleFavorite={() => toggleFavorite(selectedMeal.idMeal)}
        />
      )}
    </div>
  );
}
