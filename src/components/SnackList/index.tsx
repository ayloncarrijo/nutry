import React from "react";
import "twin.macro";

function SnackList(props: React.ComponentPropsWithoutRef<"ul">): JSX.Element {
  return <ul tw="grid grid-cols-3 gap-4" {...props} />;
}

export default SnackList;
