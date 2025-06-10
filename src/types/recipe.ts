import * as z from 'zod';

export const mealSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strCategory: z.string().optional(),
  strArea: z.string().optional(),
  strInstructions: z.string(),
  strMealThumb: z.string(),
  strYoutube: z.string().nullable(),
  // Dynamically create ingredient and measure keys
  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`strIngredient${i + 1}`, z.string().nullable()])
  ),
  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`strMeasure${i + 1}`, z.string().nullable()])
  ),
});

export type Meal = z.infer<typeof mealSchema>;

export const searchFormSchema = z.object({
  query: z.string().min(2, { message: "Search term must be at least 2 characters." }),
});

export interface RecipeState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (mealId: string) => void;
}

export interface IngredientPair {
  ingredient: string;
  measure: string;
}
