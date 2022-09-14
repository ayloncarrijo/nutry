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
      tw="hover:(text-white)"
      css={[isActive && tw`text-white underline text-underline-offset[4px]`]}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(NavLink);
