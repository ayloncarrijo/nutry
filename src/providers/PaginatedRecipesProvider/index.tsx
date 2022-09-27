import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { FullRecipe } from "types/api";

const PaginatedRecipesContext = React.createContext<ReturnType<
  typeof useNewPaginatedRecipes
> | null>(null);

interface PaginatedRecipesProviderProps
  extends FetchPaginatedProps<FullRecipe> {
  queryKeys?: {
    search: string;
    page: string;
  };
}

function PaginatedRecipesProvider({
  children,
  ...props
}: React.PropsWithChildren<PaginatedRecipesProviderProps>): JSX.Element {
  const value = useNewPaginatedRecipes(props);

  return (
    <PaginatedRecipesContext.Provider value={value}>
      {children}
    </PaginatedRecipesContext.Provider>
  );
}

const useNewPaginatedRecipes = ({
  maximumPage,
  currentPage,
  data,
  queryKeys = { search: "search", page: "page" },
}: PaginatedRecipesProviderProps) => {
  return {
    maximumPage,
    currentPage,
    data,
    queryKeys,
  };
};

const usePaginatedRecipes = () => {
  const value = React.useContext(PaginatedRecipesContext);

  if (!value) {
    throw new Error("Must be used within a PaginatedRecipesProvider");
  }

  return value;
};

export { usePaginatedRecipes };
export default PaginatedRecipesProvider;
