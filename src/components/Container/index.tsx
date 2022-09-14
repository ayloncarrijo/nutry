import type React from "react";
import "twin.macro";

function Container(props: React.ComponentPropsWithoutRef<"div">): JSX.Element {
  return <div tw="max-w-5xl mx-auto px-4" {...props} />;
}

export default Container;
