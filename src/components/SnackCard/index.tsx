import Card, { CardProps } from "components/Card";
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
  caption: string;
  cardProps?: CardProps;
}

function SnackCard({
  name,
  carbohydrates,
  fats,
  proteins,
  proportion,
  measurement,
  caption,
  cardProps,
}: SnackCardProps): JSX.Element {
  return (
    <Card {...cardProps}>
      <div tw="min-w-0 flex-1">
        <div tw="text-left">
          <p tw="mb-1 text-xs">{caption}</p>
          <h3 tw="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium text-lg">
            {name}
          </h3>
        </div>

        <div tw="my-4 text-blue-300">
          <Divider>
            {proportion}
            {measurement}
          </Divider>
        </div>

        <table
          tw="w-full table-fixed"
          css={{
            td: tw`pt-2`,
          }}
        >
          <thead>
            <tr>
              {[
                MacroIcon.CARBOHYDRATES,
                MacroIcon.FATS,
                MacroIcon.PROTEINS,
              ].map((icon, index) => (
                <th key={icon}>
                  <div
                    tw="flex"
                    css={
                      {
                        0: tw`justify-start -ml-1`,
                        1: tw`justify-center`,
                        2: tw`justify-end -mr-1`,
                      }[index]
                    }
                  >
                    <Icon icon={icon} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {[carbohydrates, fats, proteins].map((data, index) => (
                <td
                  key={index}
                  css={
                    {
                      0: tw`text-left`,
                      1: tw`text-center`,
                      2: tw`text-right`,
                    }[index]
                  }
                >
                  {Math.round(data)}g
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default SnackCard;
