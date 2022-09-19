import Card from "components/Card";
import Divider from "components/Divider";
import Icon from "components/Icon";
import "twin.macro";
import tw from "twin.macro";
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

          <div tw="my-4">
            <Divider>
              {proportion}
              {measurement}
            </Divider>
          </div>

          <table
            css={{
              ...tw`-my-1`,
              "td, th": tw`py-1`,
              td: tw`px-4`,
            }}
          >
            <tbody>
              {[
                {
                  icon: MacroIcon.CARBOHYDRATES,
                  title: "Carboidratos",
                  data: carbohydrates,
                },
                { icon: MacroIcon.FATS, title: "Gorduras", data: fats },
                {
                  icon: MacroIcon.PROTEINS,
                  title: "Proteínas",
                  data: proteins,
                },
              ].map(({ icon, title, data }) => (
                <tr key={title} title={title}>
                  <th tw="flex items-center gap-2">
                    <Icon icon={icon} size="sm" />
                    {title}
                  </th>
                  <td>{data}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

export default SnackCard;
