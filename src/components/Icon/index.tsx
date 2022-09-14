import clsx from "clsx";
import "twin.macro";

interface IconProps {
  icon: string;
  variant?: "outlined" | "filled";
}

function Icon({ icon, variant = "filled" }: IconProps): JSX.Element {
  return (
    <div
      tw="flex justify-center items-center"
      className={clsx("material-symbols-outlined", variant)}
    >
      {icon}
    </div>
  );
}

export default Icon;
