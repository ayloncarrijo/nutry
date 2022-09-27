import MacroCard from "components/MacroCard";
import SnackManager from "components/SnackManager";
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

  const [wipeStatus, setWipeStatus] = React.useState(Status.IDLE);

  const wipe = () => {
    setWipeStatus(Status.LOADING);

    Api.MAIN.put<FullDiet>(`/diets/${diet.id}`, {
      attachedFoods: [],
      attachedRecipes: [],
    })
      .then(({ data }) => {
        setWipeStatus(Status.SUCCESS);
        onDietChange(data);
      })
      .catch(() => {
        setWipeStatus(Status.ERROR);
        return SwalUtil.fireError();
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
        <SnackManager
          onWipe={wipe}
          wipeStatus={wipeStatus}
          attachedFoods={diet.attachedFoods}
          attachedRecipes={diet.attachedRecipes}
          onCreateFood={() => {
            //
          }}
          onUpdateFood={() => {
            //
          }}
          onDeleteFood={() => {
            //
          }}
          onCreateRecipe={() => {
            //
          }}
          onUpdateRecipe={() => {
            //
          }}
          onDeleteRecipe={() => {
            //
          }}
        />
      </div>
    </div>
  );
}

export default DietViewer;
