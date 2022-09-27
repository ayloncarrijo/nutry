import React from "react";
import "twin.macro";
import tw from "twin.macro";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  isHoverable?: boolean;
  elevation?: "md" | "sm";
}

function Card({
  isHoverable,
  elevation = "md",
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      tw="rounded-xl p-4 shadow-md"
      css={[
        isHoverable && tw`hover:(bg-opacity-50)`,
        {
          md: tw`bg-gray-800`,
          sm: tw`bg-gray-900`,
        }[elevation],
      ]}
      {...props}
    />
  );
}

export type { CardProps };
export default Card;
