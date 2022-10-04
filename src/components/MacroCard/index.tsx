import Icon from "components/Icon";
import React from "react";
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
  const [isPercentageVisible, setIsPercentageVisible] = React.useState(false);

  const percentage = Math.floor((currentValue / goalValue) * 100);

  return (
    <button
      type="button"
      tw="flex items-center gap-4"
      onClick={() => setIsPercentageVisible(!isPercentageVisible)}
    >
      <div tw="w-12">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: tw`stroke-current text-blue-400`,
            trail: tw`stroke-current text-gray-700`,
          }}
        >
          {isPercentageVisible ? (
            <span
              tw="font-medium"
              css={percentage >= 100 ? tw`text-xs` : tw`text-sm`}
            >
              {percentage}%
            </span>
          ) : (
            <Icon icon={icon} size="sm" />
          )}
        </CircularProgressbarWithChildren>
      </div>

      <div tw="text-left">
        <h3 tw="text-lg text-white font-medium">{title}</h3>
        <p tw="text-sm">
          {currentValue}g / {goalValue}g
        </p>
      </div>
    </button>
  );
}

export default MacroCard;
