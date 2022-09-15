import IconButton, { IconButtonProps } from "components/IconButton";
import "twin.macro";

interface PaginationButtonProps extends Omit<IconButtonProps, "icon"> {
  isActive?: boolean;
}

function PaginationButton({
  isActive,
  children,
  ...props
}: PaginationButtonProps): JSX.Element {
  return (
    <IconButton
      tw="font-medium"
      icon={<>{children}</>}
      variant={isActive ? "contained" : "default"}
      {...props}
    />
  );
}

export default PaginationButton;
