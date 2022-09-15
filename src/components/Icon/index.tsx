import clsx from "clsx";
import "twin.macro";
import tw from "twin.macro";

interface IconProps {
  icon: string | JSX.Element;
  size?: "md" | "sm";
  variant?: "outlined" | "filled";
}

function Icon({
  icon,
  size = "md",
  variant = "filled",
}: IconProps): JSX.Element {
  const isMaterialIcon = typeof icon === "string";

  return (
    <div
      tw="flex justify-center items-center select-none"
      css={{ md: tw`w-6 h-6`, sm: tw`w-5 h-5` }[size]}
      className={clsx(
        isMaterialIcon && clsx("material-symbols", size, variant)
      )}
    >
      {icon}
    </div>
  );
}

export type { IconProps };
export default Icon;
