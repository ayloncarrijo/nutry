import clsx from "clsx";
import type { IconButtonProps } from "components/IconButton";
import IconButton from "components/IconButton";
import type React from "react";
import "twin.macro";
import tw from "twin.macro";

interface ImplFieldProps extends React.PropsWithChildren {
  onTryFocus: () => void;
  isFocused: boolean;
  isRequired: boolean;
  wrapperRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

interface FieldProps {
  label: string;
  startButtons?: Array<IconButtonProps>;
  endButtons?: Array<IconButtonProps>;
  startComponent?: JSX.Element;
  endComponent?: JSX.Element;
}

function Field({
  onTryFocus,
  isFocused,
  isRequired,
  wrapperRef,
  className,
  label: rawLabel,
  children,
  startButtons,
  endButtons,
  startComponent,
  endComponent,
}: ImplFieldProps & FieldProps): JSX.Element {
  const label = clsx(rawLabel, isRequired && "*");

  const btnWrapper = tw`-mx-2 rounded-full flex relative`;

  const startElement =
    startComponent ??
    (startButtons && (
      <div css={btnWrapper}>
        {startButtons.map((startButton, index) => (
          <IconButton key={index} {...startButton} />
        ))}
      </div>
    ));

  const endElement =
    endComponent ??
    (endButtons && (
      <div css={btnWrapper}>
        {endButtons.map((endButton, index) => (
          <IconButton key={index} {...endButton} />
        ))}
      </div>
    ));

  return (
    <div tw="pt-2" ref={wrapperRef} className={className}>
      <div
        tw="relative flex items-center"
        css={[startElement && tw`pl-3`, endElement && tw`pr-3`]}
      >
        <fieldset
          tw="absolute inset-0 p-3 rounded-md border border-gray-500 text-sm cursor-text"
          css={[isFocused && tw`border-blue-300 text-blue-300`]}
          onClick={onTryFocus}
        >
          <legend tw="-ml-1 px-1 font-medium whitespace-nowrap line-height[0]">
            {label}
          </legend>
        </fieldset>

        {startElement}

        <div tw="w-full min-w-0">{children}</div>

        {endElement}
      </div>
    </div>
  );
}

export type { FieldProps };
export default Field;
