import IconButton, { IconButtonProps } from "components/IconButton";
import React from "react";
import "twin.macro";

interface ManageableProps {
  updateButtonProps?: Omit<IconButtonProps, "icon">;
  deleteButtonProps?: Omit<IconButtonProps, "icon">;
}

function Manageable({
  updateButtonProps,
  deleteButtonProps,
  children,
}: React.PropsWithChildren<ManageableProps>): JSX.Element {
  return (
    <div tw="relative">
      {children}
      <div tw="absolute -top-2 -right-2 flex gap-2">
        <IconButton
          icon="edit"
          size="sm"
          variant="contained"
          {...updateButtonProps}
        />
        <IconButton
          icon="delete"
          size="sm"
          variant="contained"
          {...deleteButtonProps}
        />
      </div>
    </div>
  );
}

export default Manageable;
