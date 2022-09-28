import Button from "components/Button";
import FoodViewer from "components/FoodViewer";
import Modal from "components/Modal";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import React from "react";
import "twin.macro";
import type { Food } from "types/api";

enum ModalStep {
  SNACK_TYPE,
  FOODS,
  RECIPES,
  QUANTITY,
}

function SnackManagerModal(): JSX.Element {
  const { isFoodOnly, closeModal } = useSnackManager();

  const [history, setHistory] = React.useState<Array<ModalStep>>([
    isFoodOnly ? ModalStep.FOODS : ModalStep.SNACK_TYPE,
  ]);

  const modalStep = history[history.length - 1];

  if (modalStep == null) {
    throw new Error("ModalStep is undefined");
  }

  const hasPrevious = history.length > 1;

  const backStep = () => {
    if (hasPrevious) {
      setHistory((prevState) => prevState.slice(0, -1));
    }
  };

  const pushStep = (step: ModalStep) => {
    setHistory((prevState) => [...prevState, step]);
  };

  const backButton = hasPrevious && (
    <Button startIcon="arrow_back" variant="outlined" onClick={backStep}>
      Voltar
    </Button>
  );

  const [selectedFood, _setSelectedFood] = React.useState<Food | null>(null);

  const setSelectedFood = (food: Food) => {
    _setSelectedFood(food);
    pushStep(ModalStep.QUANTITY);
  };

  return {
    [ModalStep.SNACK_TYPE]: (
      <Modal tw="w-full sm:w-auto" onDismiss={closeModal}>
        <div>
          <h6 tw="mb-4">O que você deseja adicionar?</h6>

          <div tw="flex flex-col gap-2 sm:(w-96 flex-row)">
            <Button
              isFullWidth
              startIcon="fastfood"
              onClick={() => pushStep(ModalStep.FOODS)}
            >
              Comida
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
      <Modal tw="w-full" title="Comidas" onDismiss={closeModal}>
        <FoodViewer onFoodClick={setSelectedFood} startButton={backButton} />
      </Modal>
    ),
    [ModalStep.RECIPES]: (
      <Modal tw="w-full" title="Receitas" onDismiss={closeModal}>
        <div>...</div>
      </Modal>
    ),
    [ModalStep.QUANTITY]: (
      <Modal tw="w-full" onDismiss={closeModal}>
        <div>{JSON.stringify(selectedFood)}</div>
      </Modal>
    ),
  }[modalStep];
}

export default SnackManagerModal;
