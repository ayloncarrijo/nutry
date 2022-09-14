import { useRouter } from "next/router";
import React from "react";
import tw from "twin.macro";

function MenuLink(
  props: React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  const { pathname } = useRouter();

  const isActive = props.href === pathname;

  return (
    <a
      tw="hover:(text-white)"
      css={[isActive && tw`text-white underline text-underline-offset[4px]`]}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(MenuLink);
