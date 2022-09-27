import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { Food } from "types/api";

const PaginatedFoodsContext = React.createContext<ReturnType<
  typeof useNewPaginatedFoods
> | null>(null);

interface PaginatedFoodsProviderProps extends FetchPaginatedProps<Food> {
  queryKeys?: {
    search: string;
    page: string;
  };
}

function PaginatedFoodsProvider({
  children,
  ...props
}: React.PropsWithChildren<PaginatedFoodsProviderProps>): JSX.Element {
  const value = useNewPaginatedFoods(props);

  return (
    <PaginatedFoodsContext.Provider value={value}>
      {children}
    </PaginatedFoodsContext.Provider>
  );
}

const useNewPaginatedFoods = ({
  maximumPage,
  currentPage,
  data,
  queryKeys = { search: "search", page: "page" },
}: PaginatedFoodsProviderProps) => {
  return {
    maximumPage,
    currentPage,
    data,
    queryKeys,
  };
};

const usePaginatedFoods = () => {
  const value = React.useContext(PaginatedFoodsContext);

  if (!value) {
    throw new Error("Must be used within a PaginatedFoodsProvider");
  }

  return value;
};

export { usePaginatedFoods };
export default PaginatedFoodsProvider;
