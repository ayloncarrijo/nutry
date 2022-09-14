import type React from "react";

function Container(props: React.ComponentPropsWithoutRef<"div">): JSX.Element {
  return <div {...props} />;
}

export default Container;
