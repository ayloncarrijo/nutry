import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { Recipe } from "types/api";

const RecipesContext = React.createContext<FetchPaginatedProps<Recipe> | null>(
  null
);

function RecipesProvider({
  maximumPage,
  currentPage,
  queryKeys,
  data,
  children,
}: React.PropsWithChildren<FetchPaginatedProps<Recipe>>): JSX.Element {
  return (
    <RecipesContext.Provider
      value={{
        maximumPage,
        currentPage,
        queryKeys,
        data,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

function useRecipes(shouldThrowIfNotFound?: true): FetchPaginatedProps<Recipe>;

function useRecipes(
  shouldThrowIfNotFound: false
): FetchPaginatedProps<Recipe> | null;

function useRecipes(shouldThrowIfNotFound = true) {
  const value = React.useContext(RecipesContext);

  if (!value && shouldThrowIfNotFound) {
    throw new Error("Must be used within a RecipesProvider");
  }

  return value;
}

export { useRecipes };
export default RecipesProvider;
