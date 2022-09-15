import React from "react";
import "twin.macro";
import tw from "twin.macro";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  hasHover?: boolean;
}

function Card({ hasHover, ...props }: CardProps): JSX.Element {
  return (
    <div
      tw="rounded-xl p-4 bg-gray-800"
      css={[hasHover && tw`hover:(bg-opacity-50)`]}
      {...props}
    />
  );
}

export default Card;
