import clsx from "clsx";
import "twin.macro";
import tw from "twin.macro";

interface IconProps {
  icon: string;
  size?: "md" | "sm";
  variant?: "outlined" | "filled";
}

function Icon({
  icon,
  size = "md",
  variant = "filled",
}: IconProps): JSX.Element {
  return (
    <div
      tw="select-none flex justify-center items-center"
      css={[
        {
          md: tw`!font-size[24px]`,
          sm: tw`!font-size[20px]`,
        }[size],
      ]}
      className={clsx("material-symbols-outlined", variant)}
    >
      {icon}
    </div>
  );
}

export default Icon;
