import Icon from "components/Icon";
import React from "react";
import "twin.macro";

interface ProfileProps extends React.ComponentPropsWithoutRef<"a"> {
  name: string;
}

function Profile(
  { name, ...props }: ProfileProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      ref={ref}
      tw="flex items-center gap-2 p-2 rounded-lg hover:(bg-white bg-opacity-5)"
      {...props}
    >
      <div tw="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
        <Icon icon="person" />
      </div>
      <span tw="font-medium">{name}</span>
    </a>
  );
}

export default React.forwardRef(Profile);
