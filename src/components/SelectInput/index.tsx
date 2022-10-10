import Field, { FieldProps } from "components/Field";
import React from "react";
import Select, { GroupBase, Props, SelectInstance } from "react-select";
import tw from "twin.macro";

interface SelectInputProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group>,
    FieldProps {
  id: string;
  isRequired?: boolean;
}

function SelectInput<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  onFocus,
  onBlur,
  id,
  styles,
  isRequired,
  ...props
}: SelectInputProps<Option, IsMulti, Group>): JSX.Element {
  const [isFocused, setIsFocused] = React.useState(false);

  const selectRef = React.useRef<SelectInstance<Option, IsMulti, Group> | null>(
    null
  );

  return (
    <Field
      onTryFocus={() => selectRef.current?.focus()}
      isFocused={isFocused}
      isRequired={!!isRequired}
      tw="relative"
      css={{
        ".react-select": {
          ...tw`w-full h-14`,
          "&__control": {
            ...tw`h-full bg-transparent border-none`,
            "&--is-focused": {
              ...tw`border-none shadow-none`,
            },
          },
          "&__input-container": {
            ...tw`m-0 p-0 text-white`,
          },
          "&__value-container": {
            ...tw`h-full p-0 py-2 mx-4`,
          },
          "&__single-value": {
            ...tw`m-0 text-white`,
          },
          "&__indicators": {
            ...tw`pr-4`,
          },
          "&__indicator": {
            ...tw`w-6 h-6 p-0 flex justify-center items-center text-gray-300 hover:text-gray-300`,
          },
          "&__indicator-separator": {
            ...tw`hidden`,
          },
          "&__menu": {
            ...tw`bg-gray-700 text-gray-300 overflow-hidden rounded-lg`,
          },
          "&__menu-portal": {
            ...tw`w-full absolute inset-auto`,
          },
          "&__menu-list": {
            ...tw`py-0`,
          },
          "&__menu-notice": {
            ...tw`text-gray-300`,
          },
          "&__option": {
            ...tw`text-base px-4`,
            "&--is-focused": {
              ...tw`bg-gray-600`,
            },
            "&--is-selected": {
              ...tw`bg-blue-500`,
            },
            "&:active": {
              ...tw`bg-gray-800`,
            },
          },
        },
      }}
      {...props}
    >
      <Select<Option, IsMulti, Group>
        ref={selectRef}
        id={id}
        styles={styles}
        instanceId={id}
        placeholder=""
        className="react-select"
        classNamePrefix="react-select"
        noOptionsMessage={() => "Oops... Nenhuma opção encontrada."}
        openMenuOnFocus
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

export default SelectInput;
