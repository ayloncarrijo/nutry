import Icon from "components/Icon";
import "twin.macro";

interface MacroCardProps {
  title: string;
  goal: number;
  current: number;
}

function MacroCard({ title, goal, current }: MacroCardProps): JSX.Element {
  const isCompleted = current >= goal;

  return (
    <div tw="rounded-xl p-4 bg-gray-800">
      <div tw="flex justify-between items-center">
        <div tw="flex items-center gap-2">
          <Icon icon="restaurant_menu" />
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
            <th tw="font-medium text-left pr-4">Meta</th>
            <td>{goal}g</td>
          </tr>
          <tr>
            <th tw="font-medium text-left pr-4">Atual</th>
            <td>{current}g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MacroCard;
