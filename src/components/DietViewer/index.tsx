import Button from "components/Button";
import MacroCard from "components/MacroCard";
import Api from "lib/api";
import { useUser } from "providers/UserProvider";
import React from "react";
import Swal from "sweetalert2";
import "twin.macro";
import { Status } from "types";
import type { FullDiet } from "types/api";
import SwalUtil from "utils/SwalUtil";

interface DietViewerProps {
  diet: FullDiet;
  onDietChange: (diet: FullDiet) => void;
}

function DietViewer({ diet, onDietChange }: DietViewerProps): JSX.Element {
  const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = useUser();

  const [cleaningStatus, setCleaningStatus] = React.useState(Status.IDLE);

  const hasSnack = diet.linkedFoods.length > 0 || diet.linkedRecipes.length > 0;

  const clearAll = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      text: "Você tem certeza de que deseja limpar todas as refeições adicionadas nesta lista?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });

    if (!isConfirmed) {
      return;
    }

    setCleaningStatus(Status.LOADING);

    try {
      const { data } = await Api.MAIN.put<FullDiet>(`/diets/${diet.id}`, {
        linkedFoods: [],
        linkedRecipes: [],
      });

      setCleaningStatus(Status.SUCCESS);
      onDietChange(data);
    } catch (error) {
      setCleaningStatus(Status.ERROR);
      await SwalUtil.fireError();
    }
  };

  return (
    <div>
      <div tw="grid gap-4 grid-cols-3">
        <MacroCard
          title="Carboidratos"
          goalValue={weight * carbohydratesPerKg}
          currentValue={diet.carbohydrates}
        />

        <MacroCard
          title="Gorduras"
          goalValue={weight * fatsPerKg}
          currentValue={diet.fats}
        />

        <MacroCard
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
            isLoading={cleaningStatus === Status.LOADING}
            onClick={() => {
              void clearAll();
            }}
          >
            Limpar
          </Button>
        </div>

        <div tw="mt-4">
          {hasSnack ? (
            <div />
          ) : (
            <div tw="w-full h-64 border border-gray-500 rounded-xl flex items-center justify-center">
              <p tw="font-medium">
                Você ainda não adicionou nenhuma refeição nesta lista.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DietViewer;
