import Icon from "components/Icon";
import React from "react";
import "twin.macro";

function Profile(
  props: React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      tw="p-2 rounded-lg flex items-center gap-2 hover:(bg-white bg-opacity-5)"
      ref={ref}
      {...props}
    >
      <div tw="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
        <Icon icon="person" />
      </div>
      <span tw="font-medium">Nickname</span>
    </a>
  );
}

export default React.forwardRef(Profile);
