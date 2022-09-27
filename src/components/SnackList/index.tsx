import React from "react";
import "twin.macro";

function SnackList(props: React.ComponentPropsWithoutRef<"ul">): JSX.Element {
  return <ul tw="grid gap-4 grid-cols-auto-fit-64" {...props} />;
}

export default SnackList;
