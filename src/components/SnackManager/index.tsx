import Button from "components/Button";
import Manageable from "components/Manageable";
import MessageBox from "components/MessageBox";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import SnackManagerContext, {
  useSnackManagerInitializer
} from "components/SnackManager/SnackManagerContext";
import SnackManagerModal from "components/SnackManager/SnackManagerModal";
import "twin.macro";
import { Status } from "types";
import { AttachedFood, AttachedRecipe, Measurement } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";
import SwalUtil from "utils/SwalUtil";

type SnackManagerProps = {
  onCreateFood: (data: AttachedFood) => void;
  onDeleteFood: (id: string) => void;
  onUpdateFood: (id: string, quantity: number) => void;
  onWipe: () => void;
  wipeStatus?: Status;
  attachedFoods: Array<AttachedFood>;
} & (
  | {
      isFoodOnly: true;
    }
  | {
      isFoodOnly?: false;
      attachedRecipes: Array<AttachedRecipe>;
      onCreateRecipe: (data: AttachedRecipe) => void;
      onDeleteRecipe: (id: string) => void;
      onUpdateRecipe: (id: string, quantity: number) => void;
    }
);

function SnackManager(props: SnackManagerProps): JSX.Element {
  const snackManager = useSnackManagerInitializer(props);

  const { wipeStatus, hasSnack, isModalOpen, openModal, onWipe } = snackManager;

  const attachedSnacks = [
    ...(!snackManager.isFoodOnly ? snackManager.attachedRecipes : []),
    ...snackManager.attachedFoods,
  ];

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
            <SnackList>
              {attachedSnacks.map((attachedSnack) => {
                const isRecipe = "recipe" in attachedSnack;

                const measurement = isRecipe
                  ? Measurement.UN
                  : attachedSnack.food.measurement;

                const snack = isRecipe
                  ? attachedSnack.recipe
                  : attachedSnack.food;

                const { carbohydrates, fats, proteins } =
                  DatabaseUtil.assignMacrosToAttachedSnack(attachedSnack);

                const onUpdate =
                  !snackManager.isFoodOnly && isRecipe
                    ? snackManager.onUpdateRecipe
                    : snackManager.onUpdateFood;

                const onDelete =
                  !snackManager.isFoodOnly && isRecipe
                    ? snackManager.onDeleteRecipe
                    : snackManager.onDeleteFood;

                return (
                  <li key={attachedSnack.id}>
                    <Manageable
                      updateButtonProps={{
                        onClick: () => {
                          openModal();
                          onUpdate(attachedSnack.id, 15);
                        },
                      }}
                      deleteButtonProps={{
                        onClick: () => {
                          void SwalUtil.confirm(
                            "Você tem certeza de que deseja deletar esta refeição?"
                          ).then(
                            ({ isConfirmed }) =>
                              isConfirmed && onDelete(attachedSnack.id)
                          );
                        },
                      }}
                    >
                      <SnackCard
                        caption={isRecipe ? "Receita" : "Ingrediente"}
                        name={snack.name}
                        measurement={measurement}
                        proportion={attachedSnack.quantity}
                        carbohydrates={carbohydrates}
                        fats={fats}
                        proteins={proteins}
                      />
                    </Manageable>
                  </li>
                );
              })}
            </SnackList>
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
