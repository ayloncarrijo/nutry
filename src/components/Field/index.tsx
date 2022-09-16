import type React from "react";
import "twin.macro";
import tw from "twin.macro";

interface FieldProps extends React.PropsWithChildren {
  onFocus?: () => void;
  label: string;
  isFocused?: boolean;
  startComponent?: JSX.Element;
  endComponent?: JSX.Element;
}

function Field({
  onFocus,
  label,
  children,
  isFocused,
  startComponent,
  endComponent,
}: FieldProps): JSX.Element {
  return (
    <div tw="pt-2">
      <div
        tw="relative flex items-center"
        css={[startComponent && tw`pl-3`, endComponent && tw`pr-3`]}
      >
        <fieldset
          tw="absolute inset-0 p-3 rounded-md border border-gray-500 text-sm cursor-text"
          css={[isFocused && tw`border-blue-300 text-blue-300`]}
          onClick={onFocus}
        >
          <legend tw="-ml-1 px-1 line-height[0] whitespace-nowrap">
            {label}
          </legend>
        </fieldset>

        {startComponent && <div tw="relative">{startComponent}</div>}

        {children}

        {endComponent && <div tw="relative">{endComponent}</div>}
      </div>
    </div>
  );
}

export default Field;
