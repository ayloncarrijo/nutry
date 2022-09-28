import Button from "components/Button";
import FoodViewer from "components/FoodViewer";
import Modal from "components/Modal";
import NumericInput from "components/NumericInput";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import React from "react";
import "twin.macro";
import type { Food, FullRecipe } from "types/api";
import { v4 as uuid } from "uuid";

enum ModalStep {
  SNACK_TYPE,
  FOODS,
  RECIPES,
  QUANTITY,
}

type FoodOrRecipe =
  | { type: "food"; data: Food }
  | { type: "recipe"; data: FullRecipe };

function SnackManagerModal(): JSX.Element {
  const { isFoodOnly, closeModal, onCreateFood } = useSnackManager();

  const [history, setHistory] = React.useState<Array<ModalStep>>([
    isFoodOnly ? ModalStep.FOODS : ModalStep.SNACK_TYPE,
  ]);

  const modalStep = history[history.length - 1];

  if (modalStep == null) {
    throw new Error("ModalStep is undefined");
  }

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

  const [snack, _setSnack] = React.useState<FoodOrRecipe | null>(null);

  const setSnack = (data: FoodOrRecipe) => {
    _setSnack(data);
    pushStep(ModalStep.QUANTITY);
  };

  const [quantityInput, setQuantityInput] =
    React.useState<HTMLInputElement | null>(null);

  const [quantity, setQuantity] = React.useState<number>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!snack || !quantity) {
      return;
    }

    if (snack.type === "food") {
      onCreateFood({
        id: uuid(),
        food: snack.data,
        foodId: snack.data.id,
        quantity,
        recipeId: null,
        dietId: null,
      });
    }

    closeModal();
  };

  React.useEffect(() => {
    quantityInput?.focus();
  }, [quantityInput]);

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
                getInputRef={setQuantityInput}
                required
                label="Quantidade"
                value={quantity}
                onValueChange={({ floatValue }) => setQuantity(floatValue)}
                endElement={
                  <span>
                    {snack.type === "recipe" ? "UN" : snack.data.measurement}
                  </span>
                }
              />
            </div>

            <div tw="mt-4 flex gap-2 justify-end">
              {backButton}

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
