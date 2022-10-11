import Button from "components/Button";
import FoodViewer from "components/FoodViewer";
import Form from "components/Form";
import Modal from "components/Modal";
import NumericInput from "components/NumericInput";
import RecipeViewer from "components/RecipeViewer";
import { useSnackManager } from "components/SnackManager/SnackManagerContext";
import Link from "next/link";
import React from "react";
import "twin.macro";
import { Status } from "types";
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
  const manager = useSnackManager();

  const { initialAttachedSnack, isFoodOnly, setIsModalOpen } = manager;

  const [submitStatus, setSubmitStatus] = React.useState(Status.IDLE);

  const [removeStatus, setRemoveStatus] = React.useState(Status.IDLE);

  const isLoading =
    submitStatus === Status.LOADING || removeStatus === Status.LOADING;

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

  const [quantity, setQuantity] = React.useState(
    isEditing ? initialAttachedSnack.quantity : undefined
  );

  const modalStep = history[history.length - 1];

  if (modalStep == null) {
    throw new Error("The current step is undefined");
  }

  const callbacks =
    snack &&
    {
      food: {
        type: "food" as const,
        onCreate: manager.onCreateFood,
        onUpdate: manager.onUpdateFood,
        onDelete: manager.onDeleteFood,
      },
      recipe: !manager.isFoodOnly
        ? {
            type: "recipe" as const,
            onCreate: manager.onCreateRecipe,
            onUpdate: manager.onUpdateRecipe,
            onDelete: manager.onDeleteRecipe,
          }
        : null,
    }[snack.type];

  const backStep = React.useCallback(() => {
    setHistory((prevState) =>
      prevState.length > 1 ? prevState.slice(0, -1) : prevState
    );
  }, []);

  const pushStep = React.useCallback((step: ModalStep) => {
    setHistory((prevState) => [...prevState, step]);
  }, []);

  const backBtn = history.length > 1 && (
    <Button
      startIcon="arrow_back"
      variant="outlined"
      disabled={isLoading}
      onClick={backStep}
    >
      Voltar
    </Button>
  );

  const closeModal = React.useCallback(() => {
    if (!isLoading) {
      setIsModalOpen(false);
    }
  }, [setIsModalOpen, isLoading]);

  const submit = () => {
    if (!callbacks || !snack || !quantity) {
      return;
    }

    setSubmitStatus(Status.LOADING);

    (async () => {
      if (isEditing) {
        await callbacks.onUpdate(initialAttachedSnack.id, quantity);
        return;
      }

      if (callbacks.type === "food" && snack.type === "food") {
        await callbacks.onCreate({
          id: uuid(),
          quantity,
          food: snack.data,
        });

        return;
      }

      if (callbacks.type === "recipe" && snack.type === "recipe") {
        await callbacks.onCreate({
          id: uuid(),
          quantity,
          recipe: snack.data,
        });

        return;
      }
    })().finally(() => {
      setSubmitStatus(Status.IDLE);
      closeModal();
    });
  };

  const remove = () => {
    if (!callbacks || !initialAttachedSnack) {
      return;
    }

    setRemoveStatus(Status.LOADING);

    Promise.resolve(callbacks.onDelete(initialAttachedSnack.id)).finally(() => {
      setRemoveStatus(Status.IDLE);
      closeModal();
    });
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
        <FoodViewer>
          {(card, food) => (
            <button
              type="button"
              onClick={() => setSnack({ type: "food", data: food })}
            >
              {card}
            </button>
          )}
        </FoodViewer>
      </Modal>
    ),
    [ModalStep.RECIPES]: (
      <Modal tw="w-full" title="Receitas" onDismiss={closeModal}>
        <RecipeViewer>
          {(card, recipe) => (
            <button
              type="button"
              onClick={() => setSnack({ type: "recipe", data: recipe })}
            >
              {card}
            </button>
          )}
        </RecipeViewer>
      </Modal>
    ),
    [ModalStep.QUANTITY]: (
      <Modal tw="w-full sm:w-112" onDismiss={closeModal}>
        {snack && (
          <Form onSubmit={submit}>
            <h4 tw="mb-6 text-2xl">
              <Link
                href={
                  snack.type === "food"
                    ? `/foods/${snack.data.id}`
                    : `/recipes/${snack.data.id}`
                }
                passHref
              >
                <a tw="hover:(text-blue-300)">{snack.data.name}</a>
              </Link>
            </h4>

            <div>
              <NumericInput
                autoFocus
                required
                label="Quantidade"
                value={quantity}
                onValueChange={({ floatValue }) => setQuantity(floatValue)}
                decimalScale={0}
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
              {backBtn}

              {isEditing && (
                <Button
                  startIcon="delete"
                  variant="outlined"
                  isLoading={removeStatus === Status.LOADING}
                  disabled={isLoading}
                  onClick={remove}
                >
                  Remover
                </Button>
              )}

              <Button
                type="submit"
                startIcon="done"
                isLoading={submitStatus === Status.LOADING}
                disabled={isLoading}
              >
                Salvar
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    ),
  }[modalStep];
}

export default SnackManagerModal;
