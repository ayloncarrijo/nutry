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
  hasHover?: boolean;
}

function SnackCard({
  name,
  carbohydrates,
  fats,
  proteins,
  proportion,
  measurement,
  hasHover,
}: SnackCardProps): JSX.Element {
  return (
    <Card hasHover={hasHover}>
      <div tw="flex gap-2">
        <div tw="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon="restaurant" />
        </div>

        <div tw="min-w-0 flex-1">
          <h3 tw="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium text-lg">
            {name}
          </h3>

          <div tw="my-2">
            <Divider>
              {proportion}
              {measurement}
            </Divider>
          </div>

          <table
            css={{
              ...tw`-my-1 w-full text-right`,
              th: tw`font-normal`,
              "td, th": tw`py-1`,
            }}
          >
            <tbody>
              {[
                {
                  icon: MacroIcon.CARBOHYDRATES,
                  title: "Carboidratos",
                  data: carbohydrates,
                },
                {
                  icon: MacroIcon.PROTEINS,
                  title: "Proteínas",
                  data: proteins,
                },
                { icon: MacroIcon.FATS, title: "Gorduras", data: fats },
              ].map(({ icon, title, data }) => (
                <tr key={title} title={title}>
                  <th>
                    <div tw="-ml-1 flex items-center gap-2">
                      <Icon icon={icon} size="sm" />
                      <span>{title}</span>
                    </div>
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
