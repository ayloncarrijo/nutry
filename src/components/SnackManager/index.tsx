import Button from "components/Button";
import MessageBox from "components/MessageBox";
import Modal from "components/Modal";
import React from "react";
import "twin.macro";
import { Status } from "types";
import type { AttachedFood, AttachedRecipe } from "types/api";
import SwalUtil from "utils/SwalUtil";

interface SnackManagerProps {
  onWipe: () => void;
  wipeStatus?: Status;
  attachedFoods?: Array<AttachedFood>;
  attachedRecipes?: Array<AttachedRecipe>;
}

function SnackManager({
  onWipe,
  wipeStatus,
  attachedFoods = [],
  attachedRecipes = [],
}: SnackManagerProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const hasSnack = attachedFoods.length > 0 || attachedRecipes.length > 0;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {isModalOpen && (
        <Modal onDismiss={closeModal} tw="w-full sm:w-auto">
          <p tw="mb-4">O que você deseja adicionar?</p>

          <div tw="flex flex-col gap-2 sm:(w-96 flex-row)">
            <Button isFullWidth startIcon="fastfood">
              Comida
            </Button>
            <Button isFullWidth startIcon="list_alt">
              Receita
            </Button>
          </div>
        </Modal>
      )}

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
          <MessageBox>...</MessageBox>
        ) : (
          <MessageBox>
            <p>Você ainda não adicionou nenhuma refeição nesta lista.</p>
          </MessageBox>
        )}
      </div>
    </div>
  );
}

export default SnackManager;
