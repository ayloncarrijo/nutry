import Button from "components/Button";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePaginatedFoods } from "providers/PaginatedFoodsProvider";
import React from "react";
import "twin.macro";
import type { Food } from "types/api";

interface FoodViewerProps {
  onClickFood: (food: Food) => void;
}

function FoodViewer({ onClickFood }: FoodViewerProps): JSX.Element {
  const {
    maximumPage,
    currentPage,
    data: foods,
    queryKeys,
  } = usePaginatedFoods();

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
        <Link href="/foods/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!foods.length ? (
        <MessageBox>
          <p>
            {initialSearch
              ? "Ainda não há comidas registradas com este nome."
              : "Ainda não há comidas registradas."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>
          {foods.map((food) => (
            <li key={food.id}>
              <button
                tw="w-full"
                type="button"
                onClick={() => onClickFood(food)}
              >
                <SnackCard cardProps={{ isHoverable: true }} {...food} />
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
