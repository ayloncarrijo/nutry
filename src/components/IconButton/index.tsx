import Icon, { IconProps } from "components/Icon";
import "twin.macro";
import tw from "twin.macro";

interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon: IconProps["icon"];
  iconProps?: Omit<IconProps, "icon">;
  variant?: "default" | "contained";
}

function IconButton({
  icon,
  iconProps,
  variant = "default",
  ...props
}: IconButtonProps): JSX.Element {
  return (
    <button
      type="button"
      tw="w-10 h-10 rounded-full flex justify-center items-center"
      css={
        {
          default: tw`hover:(bg-white bg-opacity-10)`,
          contained: tw`bg-blue-500 hover:(bg-blue-600)`,
        }[variant]
      }
      {...props}
    >
      <Icon icon={icon} {...iconProps} />
    </button>
  );
}

export type { IconButtonProps };
export default IconButton;
