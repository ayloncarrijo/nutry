import React from "react";
import styled from "styled-components";
import "twin.macro";
import tw from "twin.macro";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

function TextInput(
  { onFocus, onBlur, label, ...props }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div>
      {label && (
        <label
          tw="inline-flex mb-1 text-sm"
          css={[isFocused && tw`text-blue-300`]}
          htmlFor={props.id}
        >
          {label}
          {props.required && " *"}
        </label>
      )}

      <input
        ref={ref}
        tw="w-full ring-1 ring-gray-500 ring-inset bg-transparent rounded-lg py-3 px-4 focus:(outline-none ring-2 ring-blue-300)"
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
    </div>
  );
}

export default styled(React.forwardRef(TextInput))``;
