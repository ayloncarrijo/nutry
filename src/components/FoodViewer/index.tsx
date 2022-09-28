import Button from "components/Button";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFoods } from "providers/FoodsProvider";
import React from "react";
import "twin.macro";
import type { Food } from "types/api";

interface FoodViewerProps {
  onFoodClick: (food: Food) => void;
  startButton?: React.ReactNode;
  endButton?: React.ReactNode;
}

function FoodViewer({
  onFoodClick,
  startButton,
  endButton,
}: FoodViewerProps): JSX.Element {
  const { maximumPage, currentPage, data: foods, queryKeys } = useFoods();

  const { query, pathname, replace } = useRouter();

  const initialSearch = query[queryKeys.search];

  const [search, setSearch] = React.useState(
    typeof initialSearch === "string" ? initialSearch : ""
  );

  return (
    <div>
      <form
        tw="mb-8"
        onSubmit={(event) => {
          event.preventDefault();

          void replace({
            pathname,
            query: {
              ...(search && { [queryKeys.search]: search }),
              [queryKeys.page]: 1,
            },
          });
        }}
      >
        <TextInput
          label="Pesquisar"
          value={search}
          onValueChange={setSearch}
          endButtons={[
            {
              icon: "search",
              type: "submit",
            },
          ]}
        />
      </form>

      <div tw="mb-4 flex items-center gap-2">
        {startButton}

        <Link href="/foods/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>

        {endButton}
      </div>

      {!foods.length ? (
        <MessageBox>
          <p>
            {initialSearch
              ? "Ainda não há ingredientes registrados com este nome."
              : "Ainda não há ingredientes registrados."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>
          {foods.map((food) => (
            <li key={food.id}>
              <button
                tw="w-full"
                type="button"
                onClick={() => onFoodClick(food)}
              >
                <SnackCard
                  type="food"
                  cardProps={{ isHoverable: true }}
                  {...food}
                />
              </button>
            </li>
          ))}
        </SnackList>
      )}

      {maximumPage > 1 && (
        <div tw="mt-4 flex justify-center">
          <Pagination
            maximumPage={maximumPage}
            currentPage={currentPage}
            onPageChange={(page) => {
              void replace({
                pathname,
                query: {
                  ...query,
                  [queryKeys.page]: page,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FoodViewer;
