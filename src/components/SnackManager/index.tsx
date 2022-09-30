import Button from "components/Button";
import MessageBox from "components/MessageBox";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import SnackManagerContext, {
  useSnackManagerInitializer,
} from "components/SnackManager/SnackManagerContext";
import SnackManagerModal from "components/SnackManager/SnackManagerModal";
import React from "react";
import "twin.macro";
import { Status } from "types";
import {
  Measurement,
  SimpleAttachedFood,
  SimpleAttachedRecipe,
} from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";
import SwalUtil from "utils/SwalUtil";

type SnackManagerProps = {
  onCreateFood: (data: SimpleAttachedFood) => Promise<void> | void;
  onDeleteFood: (id: string) => Promise<void> | void;
  onUpdateFood: (id: string, quantity: number) => Promise<void> | void;
  onWipe: () => void;
  wipeStatus?: Status;
  attachedFoods: Array<SimpleAttachedFood>;
} & (
  | {
      isFoodOnly: true;
    }
  | {
      isFoodOnly?: false;
      attachedRecipes: Array<SimpleAttachedRecipe>;
      onCreateRecipe: (data: SimpleAttachedRecipe) => Promise<void> | void;
      onDeleteRecipe: (id: string) => Promise<void> | void;
      onUpdateRecipe: (id: string, quantity: number) => Promise<void> | void;
    }
);

function SnackManager(props: SnackManagerProps): JSX.Element {
  const snackManager = useSnackManagerInitializer(props);

  const {
    isModalOpen,
    hasSnack,
    wipeStatus,
    attachedSnacks,
    onWipe,
    setIsModalOpen,
    setInitialAttachedSnack,
  } = snackManager;

  const openModal = React.useCallback(
    () => setIsModalOpen(true),
    [setIsModalOpen]
  );

  const snackItemsEl = React.useMemo(
    () =>
      attachedSnacks.map((attachedSnack) => {
        const isRecipe = "recipe" in attachedSnack;

        const { measurement, name } = isRecipe
          ? { ...attachedSnack.recipe, measurement: Measurement.UN }
          : attachedSnack.food;

        const { carbohydrates, fats, proteins } =
          DatabaseUtil.getMacrosFromAttachedSnack(attachedSnack);

        return (
          <li key={attachedSnack.id}>
            <button
              tw="w-full"
              type="button"
              onClick={() => {
                setInitialAttachedSnack(attachedSnack);
                openModal();
              }}
            >
              <SnackCard
                caption={isRecipe ? "Receita" : "Ingrediente"}
                name={name}
                measurement={measurement}
                proportion={attachedSnack.quantity}
                carbohydrates={carbohydrates}
                fats={fats}
                proteins={proteins}
                cardProps={{ isHoverable: true }}
              />
            </button>
          </li>
        );
      }),
    [attachedSnacks, openModal, setInitialAttachedSnack]
  );

  return (
    <SnackManagerContext.Provider value={snackManager}>
      <div>
        {isModalOpen && <SnackManagerModal />}

        <div tw="flex gap-2">
          <Button startIcon="add" onClick={openModal}>
            Adicionar
          </Button>

          <Button
            variant="outlined"
            startIcon="delete_sweep"
            onClick={() => {
              void SwalUtil.confirm(
                "Você tem certeza de que deseja limpar todas as refeições adicionadas nesta lista?"
              ).then(({ isConfirmed }) => isConfirmed && onWipe());
            }}
            disabled={!hasSnack}
            isLoading={wipeStatus === Status.LOADING}
          >
            Limpar
          </Button>
        </div>

        <div tw="mt-4">
          {hasSnack ? (
            <SnackList>{snackItemsEl}</SnackList>
          ) : (
            <MessageBox>
              <p>Você ainda não adicionou nenhuma refeição nesta lista.</p>
            </MessageBox>
          )}
        </div>
      </div>
    </SnackManagerContext.Provider>
  );
}

export type { SnackManagerProps };
export default SnackManager;
