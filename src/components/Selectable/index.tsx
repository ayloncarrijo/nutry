import Icon from "components/Icon";
import React from "react";
import "twin.macro";
import tw from "twin.macro";

type SelectableProps = React.ComponentPropsWithoutRef<"input">;

function Selectable({ children, ...props }: SelectableProps): JSX.Element {
  return (
    <div tw="relative">
      {children}

      {props.checked && (
        <div tw="absolute inset-0 bg-blue-500 bg-opacity-10 pointer-events-none" />
      )}

      <div
        tw="absolute -left-2 -top-2 transition-transform text-blue-300"
        css={props.checked ? tw`scale-100` : tw`scale-0`}
      >
        <Icon icon="check_circle" />
      </div>

      <input type="checkbox" tw="absolute inset-0 opacity-0" {...props} />
    </div>
  );
}

export default Selectable;
