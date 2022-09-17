import React from "react";
import tw from "twin.macro";

interface NavLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
}

function NavLink(
  { isActive, ...props }: NavLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      tw="font-medium hover:(text-white)"
      css={[isActive && tw`text-blue-300`]}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(NavLink);
