import React from "react";
import styled from "styled-components";

function TextInput(
  props: React.ComponentPropsWithoutRef<"input">,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  return <input ref={ref} {...props} />;
}

const Lol = styled(TextInput)``;

<Lol as="a" href="oxe" />;

export default styled(TextInput)``;
