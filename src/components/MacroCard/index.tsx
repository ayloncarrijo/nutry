import Card from "components/Card";
import Icon from "components/Icon";
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
  const isCompleted = currentValue >= goalValue;

  return (
    <Card>
      <div tw="flex items-center gap-2">
        <div tw="w-12 h-12 bg-gray-700 rounded-full flex justify-center items-center">
          <Icon icon={icon} />
        </div>

        <div tw="flex-1">
          <div tw="flex justify-between items-center">
            <h3 tw="text-lg font-medium">{title}</h3>

            {isCompleted ? (
              <div tw="text-green-500" title="A meta foi alcançada">
                <Icon icon="task_alt" />
              </div>
            ) : (
              <div tw="text-red-500" title="A meta não foi alcançada">
                <Icon icon="error" variant="outlined" />
              </div>
            )}
          </div>

          <div tw="mt-1 flex justify-between items-center">
            <span>
              {currentValue}g / {goalValue}g
            </span>

            <span css={isCompleted ? tw`text-green-300` : tw`text-red-300`}>
              {Math.round((currentValue / goalValue) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MacroCard;
