import Icon from "components/Icon";
import Loader from "components/Loader";
import React from "react";
import styled from "styled-components";
import "twin.macro";
import tw from "twin.macro";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isFullWidth?: boolean;
  isLoading?: boolean;
  startIcon?: string;
  endIcon?: string;
}

function Button(
  {
    isFullWidth,
    isLoading,
    startIcon,
    endIcon,
    children,
    disabled: isDisabledFromProps,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const isDisabled = isDisabledFromProps || isLoading;

  return (
    <button
      ref={ref}
      tw="inline-flex justify-center items-center rounded-full px-4 py-2 bg-blue-500 text-white font-medium shadow-md hover:(bg-blue-600) disabled:(bg-blue-200 text-gray-600 cursor-not-allowed)"
      css={[
        isFullWidth && tw`w-full`,
        isLoading && tw`disabled:(text-opacity-0)`,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <div tw="absolute text-gray-600">
          <Loader />
        </div>
      )}

      {startIcon && (
        <div tw="-ml-1 mr-2">
          <Icon icon={startIcon} />
        </div>
      )}

      <span>{children}</span>

      {endIcon && (
        <div tw="-mr-1 ml-2">
          <Icon icon={endIcon} />
        </div>
      )}
    </button>
  );
}

export default styled(React.forwardRef(Button))``;
