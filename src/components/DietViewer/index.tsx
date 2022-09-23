import Button from "components/Button";
import MacroCard from "components/MacroCard";
import MessageBox from "components/MessageBox";
import Api from "lib/api";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import { MacroIcon, Status } from "types";
import type { FullDiet } from "types/api";
import SwalUtil from "utils/SwalUtil";

interface DietViewerProps {
  diet: FullDiet;
  onDietChange: (diet: FullDiet) => void;
}

function DietViewer({ diet, onDietChange }: DietViewerProps): JSX.Element {
  const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = useUser();

  const [cleaningStatus, setCleaningStatus] = React.useState(Status.IDLE);

  const hasSnack =
    diet.attachedFoods.length > 0 || diet.attachedRecipes.length > 0;

  const clearAll = () => {
    void SwalUtil.confirm(
      "Você tem certeza de que deseja limpar todas as refeições adicionadas nesta lista?"
    ).then(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }

      setCleaningStatus(Status.LOADING);

      Api.MAIN.put<FullDiet>(`/diets/${diet.id}`, {
        attachedFoods: [],
        attachedRecipes: [],
      })
        .then(({ data }) => {
          setCleaningStatus(Status.SUCCESS);
          onDietChange(data);
        })
        .catch(() => {
          setCleaningStatus(Status.ERROR);
          return SwalUtil.fireError();
        });
    });
  };

  return (
    <div>
      <div tw="grid gap-4 lg:grid-cols-3">
        <MacroCard
          icon={MacroIcon.CARBOHYDRATES}
          title="Carboidratos"
          goalValue={weight * carbohydratesPerKg}
          currentValue={diet.carbohydrates}
        />

        <MacroCard
          icon={MacroIcon.FATS}
          title="Gorduras"
          goalValue={weight * fatsPerKg}
          currentValue={diet.fats}
        />

        <MacroCard
          icon={MacroIcon.PROTEINS}
          title="Proteínas"
          goalValue={weight * proteinsPerKg}
          currentValue={diet.proteins}
        />
      </div>

      <div tw="mt-8">
        <div tw="flex gap-2">
          <Button startIcon="add">Adicionar</Button>
          <Button
            variant="outlined"
            startIcon="delete_sweep"
            disabled={!hasSnack}
            isLoading={cleaningStatus === Status.LOADING}
            onClick={clearAll}
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
    </div>
  );
}

export default DietViewer;
