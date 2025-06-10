import { create } from 'zustand';
import { RecipeState } from '@/types/recipe';

export const useRecipeStore = create<RecipeState>((set) => ({
  searchQuery: 'Paneer', // Default search query
  setSearchQuery: (query) => set({ searchQuery: query }),
  favorites: [],
  toggleFavorite: (mealId) => set((state) => ({
    favorites: state.favorites.includes(mealId)
      ? state.favorites.filter((id) => id !== mealId)
      : [...state.favorites, mealId],
  })),
}));
