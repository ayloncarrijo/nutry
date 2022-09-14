import MacroCard from "components/MacroCard";
import { useUser } from "providers/UserProvider";
import "twin.macro";
import type { FullDiet } from "types/api";

interface DietViewerProps {
  diet: FullDiet;
}

function DietViewer({ diet }: DietViewerProps): JSX.Element {
  const { weight, carbohydratesPerKg, fatsPerKg, proteinsPerKg } = useUser();

  return (
    <div>
      <div tw="grid gap-4 grid-cols-3">
        <MacroCard
          title="Carboidratos"
          goal={weight * carbohydratesPerKg}
          current={diet.carbohydrates}
        />

        <MacroCard
          title="Gorduras"
          goal={weight * fatsPerKg}
          current={diet.fats}
        />

        <MacroCard
          title="Proteínas"
          goal={weight * proteinsPerKg}
          current={diet.proteins}
        />
      </div>
    </div>
  );
}

export default DietViewer;
