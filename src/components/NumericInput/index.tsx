import type { TextInputProps } from "components/TextInput";
import TextInput from "components/TextInput";
import React from "react";
import { NumericFormat } from "react-number-format";

interface NumericInputProps
  extends Omit<
      TextInputProps,
      "onValueChange" | "value" | "defaultValue" | "type"
    >,
    React.ComponentProps<typeof NumericFormat> {}

function NumericInput(props: NumericInputProps): JSX.Element {
  return <NumericFormat {...props} customInput={TextInput} />;
}

export default NumericInput;
