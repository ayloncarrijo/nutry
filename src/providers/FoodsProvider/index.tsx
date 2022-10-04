import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import type { Food } from "types/api";

const FoodsContext = React.createContext<FetchPaginatedProps<Food> | null>(
  null
);

function FoodsProvider({
  maximumPage,
  currentPage,
  queryKeys,
  data,
  children,
}: React.PropsWithChildren<FetchPaginatedProps<Food>>): JSX.Element {
  return (
    <FoodsContext.Provider
      value={{
        maximumPage,
        currentPage,
        queryKeys,
        data,
      }}
    >
      {children}
    </FoodsContext.Provider>
  );
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
