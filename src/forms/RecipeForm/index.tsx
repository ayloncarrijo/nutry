import Button from "components/Button";
import SnackManager from "components/SnackManager";
import TextInput from "components/TextInput";
import React from "react";
import "twin.macro";
import type { AttachedFood } from "types/api";

function RecipeForm(): JSX.Element {
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
      <TextInput required label="Nome" value={name} onValueChange={setName} />

      <div tw="mt-8">
        <SnackManager
          isFoodOnly
          onWipe={wipe}
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
