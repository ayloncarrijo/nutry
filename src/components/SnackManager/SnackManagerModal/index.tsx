import Button from "components/Button";
import FoodViewer from "components/FoodViewer";
import Modal from "components/Modal";
import NumericInput from "components/NumericInput";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import React from "react";
import "twin.macro";
import { Food, Measurement, Recipe } from "types/api";
import { v4 as uuid } from "uuid";

enum ModalStep {
  SNACK_TYPE,
  FOODS,
  RECIPES,
  QUANTITY,
}

type FoodOrRecipe =
  | { type: "food"; data: Food }
  | { type: "recipe"; data: Recipe };

function SnackManagerModal(): JSX.Element {
  const snackManager = useSnackManager();

  const { isFoodOnly, initialAttachedSnack, closeModal } = snackManager;

  const isEditing = initialAttachedSnack != null;

  const [history, setHistory] = React.useState<Array<ModalStep>>(() => {
    if (isEditing) {
      return [ModalStep.QUANTITY];
    }

    if (isFoodOnly) {
      return [ModalStep.FOODS];
    }

    return [ModalStep.SNACK_TYPE];
  });

  const [quantity, setQuantity] = React.useState(
    isEditing ? initialAttachedSnack.quantity : undefined
  );

  const [snack, _setSnack] = React.useState<FoodOrRecipe | null>(() => {
    if (isEditing) {
      return "recipe" in initialAttachedSnack
        ? { type: "recipe", data: initialAttachedSnack.recipe }
        : { type: "food", data: initialAttachedSnack.food };
    }

    return null;
  });

  const setSnack = (data: FoodOrRecipe) => {
    _setSnack(data);
    pushStep(ModalStep.QUANTITY);
  };

  const modalStep = history[history.length - 1];

  if (modalStep == null) {
    throw new Error("ModalStep is undefined");
  }

  const callbacks =
    snack &&
    {
      food: {
        type: "food" as const,
        onCreate: snackManager.onCreateFood,
        onUpdate: snackManager.onUpdateFood,
        onDelete: snackManager.onDeleteFood,
      },
      recipe: !snackManager.isFoodOnly
        ? {
            type: "recipe" as const,
            onCreate: snackManager.onCreateRecipe,
            onUpdate: snackManager.onUpdateRecipe,
            onDelete: snackManager.onDeleteRecipe,
          }
        : null,
    }[snack.type];

  const hasPrevious = history.length > 1;

  const backStep = React.useCallback(() => {
    if (hasPrevious) {
      setHistory((prevState) => prevState.slice(0, -1));
    }
  }, [hasPrevious]);

  const pushStep = React.useCallback((step: ModalStep) => {
    setHistory((prevState) => [...prevState, step]);
  }, []);

  const backButton = hasPrevious && (
    <Button startIcon="arrow_back" variant="outlined" onClick={backStep}>
      Voltar
    </Button>
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!callbacks || !snack || !quantity) {
      return;
    }

    if (isEditing) {
      callbacks.onUpdate(initialAttachedSnack.id, quantity);
    } else if (callbacks.type === "food" && snack.type === "food") {
      callbacks.onCreate({
        id: uuid(),
        quantity,
        food: snack.data,
      });
    } else if (callbacks.type === "recipe" && snack.type === "recipe") {
      callbacks.onCreate({
        id: uuid(),
        quantity,
        recipe: snack.data,
      });
    }

    closeModal();
  };

  const remove = () => {
    if (!callbacks || !initialAttachedSnack) {
      return;
    }

    callbacks.onDelete(initialAttachedSnack.id);

    closeModal();
  };

  return {
    [ModalStep.SNACK_TYPE]: (
      <Modal tw="w-full sm:w-112" onDismiss={closeModal}>
        <div>
          <h6 tw="mb-4">O que você deseja adicionar?</h6>

          <div tw="flex gap-2 flex-col sm:flex-row">
            <Button
              isFullWidth
              startIcon="fastfood"
              onClick={() => pushStep(ModalStep.FOODS)}
            >
              Ingrediente
            </Button>
            <Button
              isFullWidth
              startIcon="list_alt"
              onClick={() => pushStep(ModalStep.RECIPES)}
            >
              Receita
            </Button>
          </div>
        </div>
      </Modal>
    ),
    [ModalStep.FOODS]: (
      <Modal tw="w-full" title="Ingredientes" onDismiss={closeModal}>
        <FoodViewer
          onFoodClick={(food) => setSnack({ type: "food", data: food })}
          startButton={backButton}
        />
      </Modal>
    ),
    [ModalStep.RECIPES]: (
      <Modal tw="w-full" title="Receitas" onDismiss={closeModal}>
        <div>...</div>
      </Modal>
    ),
    [ModalStep.QUANTITY]: (
      <Modal tw="w-full sm:w-112" onDismiss={closeModal}>
        {snack && (
          <form onSubmit={submit}>
            <h4 tw="mb-6 text-2xl">{snack.data.name}</h4>

            <div>
              <NumericInput
                autoFocus
                required
                label="Quantidade"
                value={quantity}
                onValueChange={({ floatValue }) => setQuantity(floatValue)}
                endElement={
                  <span>
                    {snack.type === "recipe"
                      ? Measurement.UN
                      : snack.data.measurement}
                  </span>
                }
              />
            </div>

            <div tw="mt-4 flex gap-2 justify-end">
              {backButton}

              {isEditing && (
                <Button startIcon="delete" variant="outlined" onClick={remove}>
                  Remover
                </Button>
              )}

              <Button type="submit" startIcon="done">
                Salvar
              </Button>
            </div>
          </form>
        )}
      </Modal>
    ),
  }[modalStep];
}

export default SnackManagerModal;
