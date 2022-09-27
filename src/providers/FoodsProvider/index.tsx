import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { Food } from "types/api";

const FoodsContext = React.createContext<ReturnType<typeof useNewFoods> | null>(
  null
);

interface FoodsProviderProps extends FetchPaginatedProps<Food> {
  queryKeys?: {
    search: string;
    page: string;
  };
}

function FoodsProvider({
  children,
  ...props
}: React.PropsWithChildren<FoodsProviderProps>): JSX.Element {
  const value = useNewFoods(props);

  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  );
}

function useNewFoods({
  maximumPage,
  currentPage,
  data,
  queryKeys = { search: "search", page: "page" },
}: FoodsProviderProps) {
  return {
    maximumPage,
    currentPage,
    data,
    queryKeys,
  };
}

function useFoods() {
  const value = React.useContext(FoodsContext);

  if (!value) {
    throw new Error("Must be used within a FoodsProvider");
  }

  return value;
}

export { useFoods };
export default FoodsProvider;
