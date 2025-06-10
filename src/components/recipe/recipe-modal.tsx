"use client";

import { Meal, IngredientPair } from "@/types/recipe";
import { combineIngredients } from "@/lib/api/recipe-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";

interface RecipeModalProps {
  meal: Meal;
  open: boolean;
  onClose: () => void;
  ingredients?: IngredientPair[];
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function RecipeModal({
  meal,
  open,
  onClose,
  ingredients,
  isFavorite,
  onToggleFavorite,
}: RecipeModalProps) {
  const combinedIngredients = ingredients || combineIngredients(meal);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="recipe-details">
        <DialogHeader>
          <DialogTitle>{meal.strMeal}</DialogTitle>
          <p id="recipe-details" className="text-sm text-muted-foreground sr-only">Recipe details for {meal.strMeal}</p>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>
        <div className="mt-4">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block w-full"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Watch on YouTube                  </Button>
                </a>
              )}
              {onToggleFavorite && (
                <Button 
                  onClick={onToggleFavorite} 
                  className={`mt-2 w-full ${isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              )}
            </div>
            <div className="md:col-span-2 mt-6 md:mt-0">
              <h3 className="text-xl font-semibold text-foreground border-b pb-2 mb-3">
                Ingredients
              </h3>
              <ul className="space-y-1 text-muted-foreground list-disc pl-5">
                {combinedIngredients.map((item: IngredientPair, index: number) => (
                  <li key={index}>
                    <span className="font-semibold">{item.ingredient}</span>:{" "}
                    {item.measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-foreground border-b pb-2 mb-3">
              Instructions
            </h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {meal.strInstructions}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
