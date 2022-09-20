import React from "react";
import "twin.macro";

function FieldButtons(
  props: React.ComponentPropsWithoutRef<"div">
): JSX.Element {
  return <div tw="-mx-2 h-0 flex items-center relative" {...props} />;
}

export default FieldButtons;
