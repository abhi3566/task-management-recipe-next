import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '@/lib/api/recipe-api';

export const useRecipes = (query: string) => {
  return useQuery({
    queryKey: ['recipes', query],
    queryFn: () => fetchRecipes(query),
    enabled: !!query, // Only run query if `query` is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};
