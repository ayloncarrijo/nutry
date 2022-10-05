import MacroCard from "components/MacroCard";
import SnackManager from "components/SnackManager";
import Api from "lib/api";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import { MacroIcon, Status } from "types";
import type { AttachedFood, AttachedRecipe, Diet } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";
import SwalUtil from "utils/SwalUtil";

interface DietViewerProps {
  title: string;
  diet: Diet;
  onDietChange: (diet: Diet) => void;
}

function DietViewer({
  title,
  diet,
  onDietChange,
}: DietViewerProps): JSX.Element {
  const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = useUser();

  const { carbohydrates, fats, proteins } = React.useMemo(
    () => DatabaseUtil.getMacrosFromSnackContainer(diet),
    [diet]
  );

  const [wipeStatus, setWipeStatus] = React.useState(Status.IDLE);

  const wipeAttacheds = () => {
    setWipeStatus(Status.LOADING);

    Api.MAIN.post<Diet>(`/diets/${diet.id}/wipe`)
      .then(({ data }) => {
        setWipeStatus(Status.SUCCESS);
        onDietChange(data);
      })
      .catch(() => {
        setWipeStatus(Status.ERROR);
        void SwalUtil.fireError();
      });
  };

  const updateDiet = async () => {
    const { data } = await Api.MAIN.get<Diet>(`/diets/${diet.id}`);
    onDietChange(data);
  };

  return (
    <div>
      <div>
        <h2 tw="inline-block text-2xl">
          <span>{title}</span>
          <div tw="mt-2">
            <div tw="w-2/3 h-1 bg-blue-400 rounded-full" />
          </div>
        </h2>
      </div>

      <div tw="mt-8">
        <ul tw="divide-y divide-gray-700 -my-4" css={{ li: tw`py-4` }}>
          <li>
            <MacroCard
              icon={MacroIcon.CARBOHYDRATES}
              title="Carboidratos"
              goalValue={weight * carbohydratesPerKg}
              currentValue={carbohydrates}
            />
          </li>

          <li>
            <MacroCard
              icon={MacroIcon.FATS}
              title="Gorduras"
              goalValue={weight * fatsPerKg}
              currentValue={fats}
            />
          </li>

          <li>
            <MacroCard
              icon={MacroIcon.PROTEINS}
              title="Proteínas"
              goalValue={weight * proteinsPerKg}
              currentValue={proteins}
            />
          </li>
        </ul>
      </div>

      <div tw="mt-8">
        <SnackManager
          onWipe={wipeAttacheds}
          wipeStatus={wipeStatus}
          attachedFoods={diet.attachedFoods}
          attachedRecipes={diet.attachedRecipes}
          onCreateFood={async ({ food, quantity }) => {
            await Api.MAIN.post<AttachedFood>("/attached-foods", {
              quantity,
              foodId: food.id,
              dietId: diet.id,
            })
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
          onUpdateFood={async (id, quantity) => {
            await Api.MAIN.put<AttachedFood>(`/attached-foods/${id}`, {
              quantity,
            })
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
          onDeleteFood={async (id) => {
            await Api.MAIN.delete(`/attached-foods/${id}`)
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
          onCreateRecipe={async ({ recipe, quantity }) => {
            await Api.MAIN.post("/attached-recipes", {
              quantity,
              recipeId: recipe.id,
              dietId: diet.id,
            })
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
          onUpdateRecipe={async (id, quantity) => {
            await Api.MAIN.put<AttachedRecipe>(`/attached-recipes/${id}`, {
              quantity,
            })
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
          onDeleteRecipe={async (id) => {
            await Api.MAIN.delete(`/attached-recipes/${id}`)
              .then(updateDiet)
              .catch(() => {
                void SwalUtil.fireError();
              });
          }}
        />
      </div>
    </div>
  );
}

export default DietViewer;
