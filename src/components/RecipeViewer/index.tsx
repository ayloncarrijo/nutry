import Button from "components/Button";
import Icon from "components/Icon";
import MessageBox from "components/MessageBox";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import Link from "next/link";
import { useRecipes } from "providers/RecipesProvider";
import React from "react";
import "twin.macro";
import { Measurement, Recipe } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";

interface RecipeViewerProps {
  children: (card: JSX.Element, recipe: Recipe) => React.ReactNode;
}

function RecipeViewer({ children }: RecipeViewerProps): JSX.Element {
  const { data: initialRecipes } = useRecipes();

  const [recipes, setRecipes] = React.useState(initialRecipes);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const words = search.split(" ").map((word) => word.toLowerCase());

      setRecipes(
        search
          ? initialRecipes.filter((recipe) => {
              const name = recipe.name.toLowerCase();
              return words.every((word) => name.includes(word));
            })
          : initialRecipes
      );
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search, initialRecipes]);

  return (
    <div>
      <div tw="mb-8">
        <TextInput
          label="Pesquisar"
          value={search}
          onValueChange={setSearch}
          endElement={<Icon icon="search" />}
        />
      </div>

      <div tw="mb-4 flex items-center gap-2">
        <Link href="/recipes/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!recipes.length ? (
        <MessageBox>
          <p>
            {search
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
                {children(
                  <SnackCard
                    caption="Receita"
                    carbohydrates={carbohydrates}
                    fats={fats}
                    proteins={proteins}
                    measurement={Measurement.UN}
                    proportion={1}
                    cardProps={{ isHoverable: true }}
                    {...recipe}
                  />,
                  recipe
                )}
              </li>
            );
          })}
        </SnackList>
      )}
    </div>
  );
}

export default RecipeViewer;
