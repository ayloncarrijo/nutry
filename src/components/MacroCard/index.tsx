import Icon from "components/Icon";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
  const percentage = Math.floor((currentValue / goalValue) * 100);

  return (
    <div tw="flex items-center gap-4">
      <div tw="w-12">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: tw`stroke-current text-blue-400`,
            trail: tw`stroke-current text-gray-700`,
          }}
        >
          <span
            tw="font-medium"
            css={percentage >= 100 ? tw`text-xs` : tw`text-sm`}
          >
            {percentage}%
          </span>
        </CircularProgressbarWithChildren>
      </div>

      <div>
        <h3 tw="text-lg text-white font-medium uppercase">{title}</h3>

        <div tw="flex gap-2 items-center">
          <Icon icon={icon} size="sm" />
          <p tw="text-sm">
            {Math.round(currentValue)}g / {Math.round(goalValue)}g
          </p>
        </div>
      </div>
    </div>
  );
}

export default MacroCard;
