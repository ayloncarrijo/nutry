import Button from "components/Button";
import Modal from "components/Modal";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import React from "react";
import "twin.macro";

enum ModalStep {
  SNACK_TYPE,
  SNACKS,
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

  const [snackType, _setSnackType] = React.useState<SnackType | null>(
    isFoodOnly ? SnackType.FOOD : null
  );

  const setSnackType = (snackTypeIn: SnackType) => {
    _setSnackType(snackTypeIn);
    setModalStep(ModalStep.SNACKS);
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
          [ModalStep.SNACKS]: snackType && <div>{snackType}</div>,
        }[modalStep]
      }
    </Modal>
  );
}

export default SnackManagerModal;
