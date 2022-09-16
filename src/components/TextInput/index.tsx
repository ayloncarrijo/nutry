import clsx from "clsx";
import type { IconButtonProps } from "components/IconButton";
import IconButton from "components/IconButton";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import ReactUtil from "utils/ReactUtil";

interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  onValueChange?: (value: string) => void;
  label: string;
  startButtons?: Array<IconButtonProps>;
  endButtons?: Array<IconButtonProps>;
  startComponent?: JSX.Element;
  endComponent?: JSX.Element;
}

const TextInput = ReactUtil.forwardRefWithAs<HTMLInputElement, TextInputProps>(
  (
    {
      onValueChange,
      onChange,
      onFocus,
      onBlur,
      label: rawLabel,
      startButtons,
      endButtons,
      startComponent,
      endComponent,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const input = React.useRef<HTMLInputElement | null>(null);

    const label = clsx(rawLabel, props.required && "*");

    const btnWrapper = tw`-mx-2 rounded-full flex`;

    const startItem =
      startComponent ??
      (startButtons && (
        <div css={btnWrapper}>
          {startButtons.map((startButton, index) => (
            <IconButton key={index} {...startButton} />
          ))}
        </div>
      ));

    const endItem =
      endComponent ??
      (endButtons && (
        <div css={btnWrapper}>
          {endButtons.map((endButton, index) => (
            <IconButton key={index} {...endButton} />
          ))}
        </div>
      ));

    return (
      <div tw="pt-2">
        <div
          tw="relative flex items-center"
          css={[startItem && tw`pl-3`, endItem && tw`pr-3`]}
        >
          <fieldset
            tw="absolute inset-0 p-3 rounded-md border border-gray-500 text-sm cursor-text"
            css={[isFocused && tw`border-blue-300 text-blue-300`]}
            onClick={() => input.current?.focus()}
          >
            <legend tw="-ml-1 px-1 line-height[0] whitespace-nowrap">
              {label}
            </legend>
          </fieldset>

          {startItem && <div tw="relative">{startItem}</div>}

          <input
            ref={ReactUtil.assignInstanceTo(ref, input)}
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

          {endItem && <div tw="relative">{endItem}</div>}
        </div>
      </div>
    );
  }
);

export default TextInput;
