import Field, { FieldProps } from "components/Field";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import ReactUtil from "utils/ReactUtil";

interface TextInputProps
  extends React.ComponentPropsWithoutRef<"input">,
    FieldProps {
  onValueChange?: (value: string) => void;
}

const TextInput = ReactUtil.forwardRefWithAs<HTMLInputElement, TextInputProps>(
  ({ onValueChange, onChange, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <Field
        onTryFocus={() => inputRef.current?.focus()}
        isFocused={isFocused}
        isRequired={!!props.required}
        styles={{ hitbox: tw`cursor-text` }}
        {...props}
      >
        <input
          ref={ReactUtil.assignInstanceTo(ref, inputRef)}
          tw="w-full h-14 p-3 relative text-base text-white bg-transparent focus:(outline-none)"
          onChange={(event) => {
            onValueChange?.(event.target.value);
            onChange?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />
      </Field>
    );
  }
);

export type { TextInputProps };
export default TextInput;
