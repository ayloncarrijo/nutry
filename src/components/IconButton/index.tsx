import Icon, { IconProps } from "components/Icon";
import "twin.macro";
import tw from "twin.macro";

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: IconProps["icon"];
  size?: "md" | "sm";
  variant?: "outlined" | "contained" | "icon";
  iconProps?: Omit<IconProps, "icon">;
}

function IconButton({
  icon,
  size = "md",
  variant = "icon",
  iconProps,
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <button
      type="button"
      tw="flex justify-center items-center rounded-full disabled:(text-gray-300 text-opacity-40 cursor-not-allowed)"
      css={[
        {
          md: tw`w-10 h-10`,
          sm: tw`w-8 h-8`,
        }[size],
        {
          outlined: tw`ring-inset ring-1 ring-blue-400 not-disabled:hover:(bg-blue-400 bg-opacity-20) disabled:(ring-gray-400 ring-opacity-25)`,
          contained: tw`bg-blue-500 not-disabled:hover:(bg-blue-600) disabled:(bg-gray-600 bg-opacity-25)`,
          icon: tw`not-disabled:hover:(bg-white bg-opacity-10)`,
        }[variant],
      ]}
      {...props}
    >
      <Icon icon={icon} size={size} {...iconProps} />
    </button>
  );
}

export type { IconButtonProps };
export default IconButton;
