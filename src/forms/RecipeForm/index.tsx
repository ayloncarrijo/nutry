import Button from "components/Button";
import Form from "components/Form";
import SnackManager from "components/SnackManager";
import TextInput from "components/TextInput";
import React from "react";
import Swal from "sweetalert2";
import "twin.macro";
import { Status } from "types";
import type { Recipe, SimpleAttachedFood } from "types/api";
import SwalUtil from "utils/SwalUtil";

interface RecipeFormProps {
  initialData?: Recipe;
  submitStatus: Status;
  deleteStatus?: Status;
  onSubmit: (recipe: {
    name: string;
    attachedFoods: Array<SimpleAttachedFood>;
  }) => void;
  onDelete?: () => void;
}

function RecipeForm({
  initialData,
  submitStatus,
  deleteStatus,
  onSubmit,
  onDelete,
}: RecipeFormProps): JSX.Element {
  const [name, setName] = React.useState(initialData?.name ?? "");

  const [attachedFoods, setAttachedFoods] = React.useState<
    Array<SimpleAttachedFood>
  >(initialData?.attachedFoods ?? []);

  const wipeAttacheds = () => setAttachedFoods([]);

  const isLoading =
    submitStatus === Status.LOADING || deleteStatus === Status.LOADING;

  return (
    <Form
      onSubmit={() => {
        if (!attachedFoods.length) {
          void Swal.fire({
            icon: "warning",
            text: "Você deve adicionar ao menos uma refeição para criar uma receita.",
          });

          return;
        }

        onSubmit({
          name,
          attachedFoods,
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

      <div tw="mt-4 flex gap-2 justify-end">
        {initialData && (
          <Button
            isLoading={deleteStatus === Status.LOADING}
            disabled={isLoading}
            type="button"
            variant="outlined"
            startIcon="delete_sweep"
            onClick={() => {
              void SwalUtil.confirm(
                "Você tem certeza de que deseja deletar esta receita?"
              ).then(({ isConfirmed }) => isConfirmed && onDelete?.());
            }}
          >
            Deletar
          </Button>
        )}

        <Button
          isLoading={submitStatus === Status.LOADING}
          disabled={isLoading}
          type="submit"
          startIcon="done"
        >
          Salvar
        </Button>
      </div>
    </Form>
  );
}

export default RecipeForm;
