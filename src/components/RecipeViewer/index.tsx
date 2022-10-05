import Button from "components/Button";
import Form from "components/Form";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecipes } from "providers/RecipesProvider";
import React from "react";
import "twin.macro";
import { Measurement, Recipe } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";

interface RecipeViewerProps {
  onRecipeClick: (recipe: Recipe) => void;
  startButton?: React.ReactNode;
  endButton?: React.ReactNode;
}

function RecipeViewer({
  onRecipeClick,
  startButton,
  endButton,
}: RecipeViewerProps): JSX.Element {
  const { maximumPage, currentPage, queryKeys, data: recipes } = useRecipes();

  const { query, pathname, replace } = useRouter();

  const currentSearch =
    typeof query[queryKeys.search] === "string" ? query[queryKeys.search] : "";

  const [typedSearch, setTypedSearch] = React.useState(currentSearch);

  return (
    <div>
      <Form
        tw="mb-8"
        onSubmit={() => {
          void replace({
            pathname,
            query: {
              ...query,
              [queryKeys.search]: typedSearch,
              [queryKeys.page]: 1,
            },
          });
        }}
      >
        <TextInput
          label="Pesquisar"
          value={typedSearch}
          onValueChange={setTypedSearch}
          endButtons={[
            {
              icon: "search",
              type: "submit",
            },
          ]}
        />
      </Form>

      <div tw="mb-4 flex items-center gap-2">
        {startButton}

        <Link href="/recipes/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>

        {endButton}
      </div>

      {!recipes.length ? (
        <MessageBox>
          <p>
            {currentSearch
              ? "Ainda não há receitas registradas com este nome."
              : "Ainda não há receitas registradas."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>
          {recipes.map((recipe) => {
            const { carbohydrates, fats, proteins } =
              DatabaseUtil.getMacrosFromSnackContainer(recipe);

            return (
              <li key={recipe.id}>
                <button
                  tw="w-full"
                  type="button"
                  onClick={() => onRecipeClick(recipe)}
                >
                  <SnackCard
                    caption="Receita"
                    carbohydrates={carbohydrates}
                    fats={fats}
                    proteins={proteins}
                    measurement={Measurement.UN}
                    proportion={1}
                    cardProps={{ isHoverable: true }}
                    {...recipe}
                  />
                </button>
              </li>
            );
          })}
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

export default RecipeViewer;
