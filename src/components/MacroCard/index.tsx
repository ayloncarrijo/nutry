import Card from "components/Card";
import Icon from "components/Icon";
import "twin.macro";

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
      <div tw="flex justify-between items-center">
        <div tw="flex items-center gap-2">
          <Icon icon={icon} />
          <h3 tw="text-xl font-medium">{title}</h3>
        </div>

        {isCompleted ? (
          <div tw="text-green-500">
            <Icon icon="task_alt" />
          </div>
        ) : (
          <div tw="text-red-500">
            <Icon icon="error" variant="outlined" />
          </div>
        )}
      </div>

      <table tw="mt-4">
        <tbody>
          <tr>
            <th tw="pr-4">Meta</th>
            <td>{goalValue}g</td>
          </tr>
          <tr>
            <th tw="pr-4">Atual</th>
            <td>{currentValue}g</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

export default MacroCard;
