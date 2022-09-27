import Button from "components/Button";
import Modal from "components/Modal";
import SnackCard from "components/SnackCard";
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
  const { isFoodOnly, paginatedFoods, closeModal } = useSnackManager();

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

  return (
    <Modal tw="w-full sm:w-auto" onDismiss={closeModal}>
      {
        {
          [ModalStep.SNACK_TYPE]: (
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
          ),
          [ModalStep.SNACKS]: (
            <div>
              {!isFoodOnly && (
                <div
                  tw="mb-4"
                  onClick={() => setModalStep(ModalStep.SNACK_TYPE)}
                >
                  <Button startIcon="arrow_back" variant="outlined">
                    Voltar
                  </Button>
                </div>
              )}

              {
                {
                  [SnackType.FOOD]: (
                    <ul tw="grid gap-4 md:grid-cols-2">
                      {paginatedFoods.data.map((food) => (
                        <li key={food.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedFood(food)}
                          >
                            <SnackCard
                              cardProps={{
                                isHoverable: true,
                                elevation: "sm",
                              }}
                              {...food}
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ),
                  [SnackType.RECIPE]: <div />,
                }[snackType]
              }
            </div>
          ),
          [ModalStep.QUANTITY]: <div>{JSON.stringify(selectedFood)}</div>,
        }[modalStep]
      }
    </Modal>
  );
}

export default SnackManagerModal;
