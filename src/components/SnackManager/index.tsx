import Button from "components/Button";
import MessageBox from "components/MessageBox";
import SnackManagerContext, {
  useNewSnackManager,
} from "components/SnackManager/SnackManagerContext";
import SnackManagerModal from "components/SnackManager/SnackManagerModal";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import "twin.macro";
import { Status } from "types";
import type { AttachedFood, AttachedRecipe, Food, FullRecipe } from "types/api";
import SwalUtil from "utils/SwalUtil";

type SnackManagerProps = {
  onCreateFood: (data: { foodId: string; quantity: number }) => void;
  onDeleteFood: (id: string) => void;
  onUpdateFood: (id: string, quantity: number) => void;
  onWipe: () => void;
  wipeStatus?: Status;
  paginatedFoods: FetchPaginatedProps<Food>;
  attachedFoods: Array<AttachedFood>;
} & (
  | {
      isFoodOnly: true;
    }
  | {
      isFoodOnly?: false;
      paginatedRecipes: FetchPaginatedProps<FullRecipe>;
      attachedRecipes: Array<AttachedRecipe>;
      onCreateRecipe: (data: { recipeId: string; quantity: number }) => void;
      onDeleteRecipe: (id: string) => void;
      onUpdateRecipe: (id: string, quantity: number) => void;
    }
);

function SnackManager(props: SnackManagerProps): JSX.Element {
  const snackManager = useNewSnackManager(props);

  const { wipeStatus, hasSnack, isModalOpen, openModal, onWipe } = snackManager;

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
            <MessageBox>...</MessageBox>
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
