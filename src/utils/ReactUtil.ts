import React from "react";
import styled from "styled-components";

class ReactUtil {
  public static forwardRefWithAs<Ref, Props = Record<string, unknown>>(
    render: React.ForwardRefRenderFunction<Ref, Props & { as?: string }>
  ) {
    return styled(React.forwardRef(render))``;
  }
}

export default ReactUtil;
