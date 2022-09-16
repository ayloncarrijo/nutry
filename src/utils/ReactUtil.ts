import React from "react";
import styled from "styled-components";

class ReactUtil {
  public static assignInstanceTo<T>(
    ...forwardedRefs: Array<React.ForwardedRef<T>>
  ) {
    return (instance: T | null) =>
      forwardedRefs.forEach((forwardedRef) => {
        if (!forwardedRef) {
          return;
        }

        if (typeof forwardedRef === "function") {
          forwardedRef(instance);
        } else {
          forwardedRef.current = instance;
        }
      });
  }

  public static forwardRefWithAs<Ref, Props = Record<string, unknown>>(
    render: React.ForwardRefRenderFunction<Ref, Props & { as?: string }>
  ) {
    return styled(React.forwardRef(render))``;
  }
}

export default ReactUtil;
