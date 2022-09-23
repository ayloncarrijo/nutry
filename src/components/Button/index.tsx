import Icon from "components/Icon";
import Loader from "components/Loader";
import React from "react";
import "twin.macro";
import tw from "twin.macro";
import ReactUtil from "utils/ReactUtil";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  isFullWidth?: boolean;
  isLoading?: boolean;
  variant?: "outlined" | "contained";
  startIcon?: string;
  endIcon?: string;
}

const Button = ReactUtil.forwardRefWithAs<HTMLButtonElement, ButtonProps>(
  (
    {
      isFullWidth,
      isLoading,
      variant = "contained",
      startIcon,
      endIcon,
      children,
      disabled: isDisabledFromProps,
      ...props
    },
    ref
  ) => {
    const isDisabled = isDisabledFromProps || isLoading;

    return (
      <button
        ref={ref}
        type="button"
        tw="inline-flex justify-center items-center rounded-full px-4 py-2 text-white font-medium shadow-md select-none disabled:(text-gray-300 text-opacity-40 cursor-not-allowed)"
        css={[
          isFullWidth && tw`w-full`,
          isLoading && tw`disabled:(text-opacity-0)`,
          {
            outlined: tw`ring-inset ring-1 ring-blue-400 not-disabled:hover:(bg-blue-400 bg-opacity-20) disabled:(ring-gray-400 ring-opacity-25)`,
            contained: tw`bg-blue-500 not-disabled:hover:(bg-blue-600) disabled:(bg-gray-600 bg-opacity-25)`,
          }[variant],
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
            <Icon icon={startIcon} size="sm" />
          </div>
        )}

        <span>{children}</span>

        {endIcon && (
          <div tw="-mr-1 ml-2">
            <Icon icon={endIcon} size="sm" />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
