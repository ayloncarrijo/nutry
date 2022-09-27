import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { FullRecipe } from "types/api";

const RecipesContext = React.createContext<ReturnType<
  typeof useNewRecipes
> | null>(null);

interface RecipesProviderProps extends FetchPaginatedProps<FullRecipe> {
  queryKeys?: {
    search: string;
    page: string;
  };
}

function RecipesProvider({
  children,
  ...props
}: React.PropsWithChildren<RecipesProviderProps>): JSX.Element {
  const value = useNewRecipes(props);

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
}

function useNewRecipes({
  maximumPage,
  currentPage,
  data,
  queryKeys = { search: "search", page: "page" },
}: RecipesProviderProps) {
  return {
    maximumPage,
    currentPage,
    data,
    queryKeys,
  };
}

function useRecipes(
  shouldThrowIfNotFound?: true
): ReturnType<typeof useNewRecipes>;

function useRecipes(
  shouldThrowIfNotFound: false
): ReturnType<typeof useNewRecipes> | null;

function useRecipes(shouldThrowIfNotFound = true) {
  const value = React.useContext(RecipesContext);

  if (!value && shouldThrowIfNotFound) {
    throw new Error("Must be used within a RecipesProvider");
  }

  return value;
}

export { useRecipes };
export default RecipesProvider;
