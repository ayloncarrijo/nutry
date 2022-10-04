import MacroCard from "components/MacroCard";
import SnackManager from "components/SnackManager";
import Api from "lib/api";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import { MacroIcon, Status } from "types";
import type { Diet } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";
import SwalUtil from "utils/SwalUtil";

interface DietViewerProps {
  diet: Diet;
  onDietChange: (diet: Diet) => void;
}

function DietViewer({ diet, onDietChange }: DietViewerProps): JSX.Element {
  const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = useUser();

  const { carbohydrates, fats, proteins } = React.useMemo(
    () => DatabaseUtil.getMacrosFromSnackContainer(diet),
    [diet]
  );

  const [wipeStatus, setWipeStatus] = React.useState(Status.IDLE);

  const wipeAttacheds = () => {
    setWipeStatus(Status.LOADING);

    Api.MAIN.put<Diet>(`/diets/${diet.id}`, {
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
          currentValue={carbohydrates}
        />

        <MacroCard
          icon={MacroIcon.FATS}
          title="Gorduras"
          goalValue={weight * fatsPerKg}
          currentValue={fats}
        />

        <MacroCard
          icon={MacroIcon.PROTEINS}
          title="Proteínas"
          goalValue={weight * proteinsPerKg}
          currentValue={proteins}
        />
      </div>

      <div tw="mt-8">
        <SnackManager
          onWipe={wipeAttacheds}
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
