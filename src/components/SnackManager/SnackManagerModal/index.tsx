import Button from "components/Button";
import FoodViewer from "components/FoodViewer";
import Modal from "components/Modal";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import React from "react";
import "twin.macro";
import type { Food } from "types/api";

enum ModalStep {
  SNACK_TYPE,
  SNACKS,
  QUANTITY,
}

enum SnackType {
  FOOD,
  RECIPE,
}

function SnackManagerModal(): JSX.Element {
  const { isFoodOnly, closeModal } = useSnackManager();

  const [modalStep, setModalStep] = React.useState(
    isFoodOnly ? ModalStep.SNACKS : ModalStep.SNACK_TYPE
  );

  const [snackType, _setSnackType] = React.useState(SnackType.FOOD);

  const setSnackType = (snackTypeIn: SnackType) => {
    _setSnackType(snackTypeIn);
    setModalStep(ModalStep.SNACKS);
  };

  const [selectedFood, _setSelectedFood] = React.useState<Food | null>(null);

  const setSelectedFood = (food: Food) => {
    _setSelectedFood(food);
    setModalStep(ModalStep.QUANTITY);
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
              onClick={() => setSnackType(SnackType.FOOD)}
            >
              Comida
            </Button>
            <Button
              isFullWidth
              startIcon="list_alt"
              onClick={() => setSnackType(SnackType.RECIPE)}
            >
              Receita
            </Button>
          </div>
        </div>
      </Modal>
    ),
    [ModalStep.SNACKS]: (
      <Modal
        tw="w-full"
        title={
          {
            [SnackType.FOOD]: "Comidas",
            [SnackType.RECIPE]: "Receitas",
          }[snackType]
        }
        onDismiss={closeModal}
      >
        {
          {
            [SnackType.FOOD]: (
              <FoodViewer
                onFoodClick={setSelectedFood}
                startButton={
                  !isFoodOnly && (
                    <Button
                      startIcon="arrow_back"
                      variant="outlined"
                      onClick={() => setModalStep(ModalStep.SNACK_TYPE)}
                    >
                      Voltar
                    </Button>
                  )
                }
              />
            ),
            [SnackType.RECIPE]: <div />,
          }[snackType]
        }
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
