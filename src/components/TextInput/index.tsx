import clsx from "clsx";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import ReactUtil from "utils/ReactUtil";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  onValueChange?: (value: string) => void;
}

const TextInput = ReactUtil.forwardRefWithAs<HTMLInputElement, TextInputProps>(
  (
    { onValueChange, onChange, onFocus, onBlur, label: rawLabel, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const label = clsx(rawLabel, props.required && "*");

    return (
      <div tw="pt-1">
        <div tw="relative">
          <fieldset
            tw="absolute inset-0 -mt-3 p-3 pointer-events-none rounded-md border border-gray-500"
            css={[isFocused && tw`border-blue-300 text-blue-300`]}
          >
            <legend tw="-ml-1">
              <span tw="px-1 text-sm">{label}</span>
            </legend>
          </fieldset>

          <input
            ref={ref}
            tw="w-full h-14 p-3 text-base text-white bg-transparent focus:(outline-none)"
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
        </div>
      </div>
    );
  }
);

export default TextInput;
