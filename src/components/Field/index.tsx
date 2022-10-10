import clsx from "clsx";
import FieldButtons from "components/Field/FieldButtons";
import type { IconButtonProps } from "components/IconButton";
import IconButton from "components/IconButton";
import type React from "react";
import "twin.macro";
import tw from "twin.macro";
import type { Styles } from "types";

interface ImplFieldProps extends React.PropsWithChildren {
  onTryFocus: () => void;
  isFocused: boolean;
  isRequired: boolean;
  wrapperRef?: React.Ref<HTMLDivElement>;
  className?: string;
  styles?: Styles<"hitbox">;
}

interface FieldProps {
  label: string;
  startElement?: JSX.Element;
  endElement?: JSX.Element;
  startButtons?: Array<IconButtonProps>;
  endButtons?: Array<IconButtonProps>;
}

function Field({
  onTryFocus,
  isFocused,
  isRequired,
  wrapperRef,
  className,
  styles,
  children,
  label: rawLabel,
  startElement: startElementFromProps,
  endElement: endElementFromProps,
  startButtons,
  endButtons,
}: ImplFieldProps & FieldProps): JSX.Element {
  const label = clsx(rawLabel, isRequired && "*");

  const startElement =
    startElementFromProps ??
    (startButtons && (
      <FieldButtons>
        {startButtons.map((startButton, index) => (
          <IconButton key={index} {...startButton} />
        ))}
      </FieldButtons>
    ));

  const endElement =
    endElementFromProps ??
    (endButtons && (
      <FieldButtons>
        {endButtons.map((endButton, index) => (
          <IconButton key={index} {...endButton} />
        ))}
      </FieldButtons>
    ));

  return (
    <div tw="pt-2" ref={wrapperRef} className={className}>
      <div
        tw="relative flex items-center"
        css={[startElement && tw`pl-4`, endElement && tw`pr-4`]}
      >
        <fieldset
          tw="absolute inset-0 px-4 rounded-lg border border-gray-500 text-sm"
          css={[isFocused && tw`border-blue-300 text-blue-300`, styles?.hitbox]}
          onClick={onTryFocus}
        >
          <legend tw="-ml-1 px-1 font-medium whitespace-nowrap line-height[0]">
            {label}
          </legend>
        </fieldset>

        {startElement}

        <div tw="w-full min-w-0 flex-1">{children}</div>

        {endElement}
      </div>
    </div>
  );
}

export type { FieldProps };
export default Field;
