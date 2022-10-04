import Button from "components/Button";
import Form from "components/Form";
import SnackManager from "components/SnackManager";
import TextInput from "components/TextInput";
import React from "react";
import Swal from "sweetalert2";
import "twin.macro";
import { Status } from "types";
import type { SimpleAttachedFood } from "types/api";

interface RecipeFormProps {
  onSubmit: (recipe: {
    name: string;
    attachedFoods: Array<SimpleAttachedFood>;
  }) => void;
  submitStatus: Status;
}

function RecipeForm({ onSubmit, submitStatus }: RecipeFormProps): JSX.Element {
  const [attachedFoods, setAttachedFoods] = React.useState<
    Array<SimpleAttachedFood>
  >([]);

  const wipeAttacheds = () => setAttachedFoods([]);

  const [name, setName] = React.useState("");

  const isLoading = submitStatus === Status.LOADING;

  return (
    <Form
      onSubmit={() => {
        if (!attachedFoods.length) {
          void Swal.fire({
            icon: "warning",
            text: "Você deve adicionar ao menos uma refeição para criar uma receita.",
          });
        }

        onSubmit({
          attachedFoods,
          name,
        });
      }}
    >
      <TextInput required label="Título" value={name} onValueChange={setName} />

      <div tw="mt-8">
        <SnackManager
          isFoodOnly
          onWipe={wipeAttacheds}
          attachedFoods={attachedFoods}
          onCreateFood={(data) => {
            setAttachedFoods((prevState) => [data, ...prevState]);
          }}
          onUpdateFood={(id, quantity) => {
            setAttachedFoods((prevState) =>
              prevState.map((attachedFood) =>
                attachedFood.id !== id
                  ? attachedFood
                  : { ...attachedFood, quantity }
              )
            );
          }}
          onDeleteFood={(id) => {
            setAttachedFoods((prevState) =>
              prevState.filter((attachedFood) => attachedFood.id !== id)
            );
          }}
        />
      </div>

      <div tw="mt-4 flex justify-end">
        <Button
          type="submit"
          startIcon="done"
          isLoading={submitStatus === Status.LOADING}
          disabled={isLoading}
        >
          Registrar
        </Button>
      </div>
    </Form>
  );
}

export default RecipeForm;
