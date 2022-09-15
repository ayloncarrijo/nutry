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
      tw="text-sm font-medium"
      icon={<>{children}</>}
      size="sm"
      variant={isActive ? "contained" : "icon"}
      {...props}
    />
  );
}

export default PaginationButton;
