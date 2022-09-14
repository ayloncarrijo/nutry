import type React from "react";
import "twin.macro";

function Divider({ children }: React.PropsWithChildren): JSX.Element {
  const line = <div tw="flex-1 h-px bg-gray-500" />;

  return (
    <div tw="flex items-center">
      {line}
      <span tw="px-3 text-sm font-medium uppercase">{children}</span>
      {line}
    </div>
  );
}

export default Divider;
