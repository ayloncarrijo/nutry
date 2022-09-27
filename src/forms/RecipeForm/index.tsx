import Button from "components/Button";
import SnackManager from "components/SnackManager";
import TextInput from "components/TextInput";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import React from "react";
import "twin.macro";
import type { AttachedFood, Food } from "types/api";

interface RecipeFormProps {
  paginatedFoods: FetchPaginatedProps<Food>;
}

function RecipeForm({ paginatedFoods }: RecipeFormProps): JSX.Element {
  const [attachedFoods, setAttachedFoods] = React.useState<Array<AttachedFood>>(
    []
  );

  const [name, setName] = React.useState("");

  const wipe = () => setAttachedFoods([]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextInput required label="Título" value={name} onValueChange={setName} />

      <div tw="mt-8">
        <SnackManager
          isFoodOnly
          onWipe={wipe}
          paginatedFoods={paginatedFoods}
          attachedFoods={attachedFoods}
          onCreateFood={() => {
            //
          }}
          onUpdateFood={() => {
            //
          }}
          onDeleteFood={() => {
            //
          }}
        />
      </div>

      <div tw="mt-4 flex justify-end">
        <Button type="submit" startIcon="done">
          Registrar
        </Button>
      </div>
    </form>
  );
}

export default RecipeForm;
