import { Meal } from '@/types/recipe';

export const fetchRecipes = async (query: string): Promise<Meal[]> => {
  if (!query) return [];
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // The API returns { meals: null } for no results
  return data.meals || [];
};

export const combineIngredients = (meal: Meal): { ingredient: string; measure: string }[] => {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;
    const ingredient = meal[ingredientKey] as string | null;
    const measure = meal[measureKey] as string | null;

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure: measure || '' });
    }
  }
  return ingredients;
};
