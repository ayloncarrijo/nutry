import Icon from "components/Icon";
import React from "react";
import "twin.macro";
import tw from "twin.macro";

interface ProfileProps extends React.ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
  name: string;
}

function Profile(
  { isActive, name, ...props }: ProfileProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      ref={ref}
      tw="flex items-center gap-2 p-2 rounded-lg hover:(bg-white bg-opacity-5)"
      css={[isActive && tw`text-white`]}
      {...props}
    >
      <div
        tw="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center"
        css={[isActive && tw`bg-blue-500`]}
      >
        <Icon icon="person" />
      </div>
      <span tw="font-medium">{name}</span>
    </a>
  );
}

export default React.forwardRef(Profile);
