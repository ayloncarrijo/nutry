import Card from "components/Card";
import Divider from "components/Divider";
import Icon from "components/Icon";
import "twin.macro";
import { MacroIcon } from "types";
import type { Measurement } from "types/api";

interface SnackCardProps {
  name: string;
  carbohydrates: number;
  fats: number;
  proteins: number;
  proportion: number;
  measurement: Measurement;
}

function SnackCard({
  name,
  carbohydrates,
  fats,
  proteins,
  proportion,
  measurement,
}: SnackCardProps): JSX.Element {
  return (
    <Card hasHover>
      <div tw="flex gap-2">
        <div tw="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon="restaurant" />
        </div>

        <div tw="min-w-0 flex-1">
          <h3 tw="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium text-lg">
            {name}
          </h3>

          <div tw="mt-2 mb-4">
            <Divider>
              {proportion}
              {measurement}
            </Divider>
          </div>

          <div tw="w-full flex justify-between">
            {[
              {
                icon: MacroIcon.CARBOHYDRATES,
                title: "Carboidratos",
                data: carbohydrates,
              },
              { icon: MacroIcon.FATS, title: "Gorduras", data: fats },
              { icon: MacroIcon.PROTEINS, title: "Proteínas", data: proteins },
            ].map(({ icon, title, data }) => (
              <div key={title} title={title} tw="flex gap-1 items-center">
                <Icon icon={icon} size="sm" />
                <p>{data}g</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SnackCard;
