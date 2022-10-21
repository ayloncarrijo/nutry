import Icon from "components/Icon";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "twin.macro";
import tw from "twin.macro";

interface MacroCardProps {
  icon: string;
  title: string;
  goalValue: number;
  currentValue: number;
}

function MacroCard({
  icon,
  title,
  goalValue,
  currentValue,
}: MacroCardProps): JSX.Element {
  const percentageValue = Math.floor((currentValue / goalValue) * 100);

  return (
    <div tw="flex flex-col items-center">
      <h3 tw="mb-2 font-medium text-white text-base">{title}</h3>

      <div tw="w-20">
        <CircularProgressbarWithChildren
          value={percentageValue}
          styles={{
            path: tw`stroke-current text-blue-400`,
            trail: tw`stroke-current text-gray-700`,
          }}
        >
          <div tw="flex flex-col items-center gap-2">
            <Icon icon={icon} size="sm" />
            <span tw="font-medium text-xs">{percentageValue}%</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <p tw="mt-2 text-sm">
        {Math.round(currentValue)}g / {Math.round(goalValue)}g
      </p>
    </div>
  );
}

export default MacroCard;
