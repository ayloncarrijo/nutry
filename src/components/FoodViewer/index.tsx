import Button from "components/Button";
import Icon from "components/Icon";
import MessageBox from "components/MessageBox";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import Link from "next/link";
import { useFoods } from "providers/FoodsProvider";
import React from "react";
import "twin.macro";
import type { Food } from "types/api";

interface FoodViewerProps {
  children: (card: JSX.Element, food: Food) => React.ReactNode;
}

function FoodViewer({ children }: FoodViewerProps): JSX.Element {
  const { data: initialFoods } = useFoods();

  const [foods, setFoods] = React.useState(initialFoods);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const words = search.split(" ").map((word) => word.toLowerCase());

      setFoods(
        search
          ? initialFoods.filter((food) => {
              const name = food.name.toLowerCase();
              return words.every((word) => name.includes(word));
            })
          : initialFoods
      );
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search, initialFoods]);

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
        <Link href="/foods/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!foods.length ? (
        <MessageBox>
          <p>
            {search
              ? "Ainda não há ingredientes registrados com este nome."
              : "Ainda não há ingredientes registrados."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>
          {foods.map((food) => {
            return (
              <li key={food.id}>
                {children(
                  <SnackCard
                    caption="Ingrediente"
                    cardProps={{ isHoverable: true }}
                    {...food}
                  />,
                  food
                )}
              </li>
            );
          })}
        </SnackList>
      )}
    </div>
  );
}

export default FoodViewer;
