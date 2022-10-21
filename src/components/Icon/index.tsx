import clsx from "clsx";
import React from "react";
import "twin.macro";
import tw from "twin.macro";

interface IconProps {
  icon: string | JSX.Element;
  size?: "md" | "sm" | "xs";
  variant?: "outlined" | "filled";
}

function Icon({
  icon,
  size = "md",
  variant = "filled",
}: IconProps): JSX.Element {
  const [isMaterialReady, setIsMaterialReady] = React.useState(false);

  const isMaterialIcon = typeof icon === "string";

  React.useEffect(() => {
    void window.document.fonts.ready.then(() => setIsMaterialReady(true));
  }, []);

  return (
    <div
      tw="flex justify-center items-center select-none"
      css={[
        { md: tw`w-6 h-6`, sm: tw`w-5 h-5`, xs: tw`w-4 h-4` }[size],
        !isMaterialReady && tw`opacity-0`,
      ]}
      className={isMaterialIcon ? clsx("material-symbols", size, variant) : ""}
    >
      {icon}
    </div>
  );
}

export type { IconProps };
export default Icon;
