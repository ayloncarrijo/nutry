import Icon from "components/Icon";
import React from "react";
import tw from "twin.macro";

interface NavLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
  icon: string;
}

function NavLink(
  { isActive, icon, children, ...props }: NavLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      tw="flex items-center gap-4 p-4 font-medium hover:(text-white bg-blue-500 bg-opacity-10)"
      css={[isActive && tw`text-blue-300`]}
      ref={ref}
      {...props}
    >
      <Icon icon={icon} variant={isActive ? "filled" : "outlined"} />
      {children}
    </a>
  );
}

export default React.forwardRef(NavLink);
