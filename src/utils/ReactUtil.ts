import React from "react";
import styled from "styled-components";

class ReactUtil {
  public static forwardRefWithAs<T, P = Record<string, unknown>>(
    render: React.ForwardRefRenderFunction<T, P & { as?: string }>
  ) {
    return styled(React.forwardRef(render))``;
  }
}

export default ReactUtil;
