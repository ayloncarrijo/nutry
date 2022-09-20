import Field, { FieldProps } from "components/Field";
import Icon from "components/Icon";
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
  onMenuOpen,
  onMenuClose,
  onFocus,
  onBlur,
  id,
  styles,
  isRequired,
  ...props
}: SelectInputProps<Option, IsMulti, Group>): JSX.Element {
  const [isFocused, setIsFocused] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const selectRef = React.useRef<SelectInstance<Option, IsMulti, Group> | null>(
    null
  );

  const wasFocused = React.useRef(false);

  return (
    <Field
      onTryFocus={() => {
        if (wasFocused.current) {
          wasFocused.current = false;
          return;
        }

        selectRef.current?.focus();
      }}
      isFocused={isFocused}
      isRequired={!!isRequired}
      wrapperRef={wrapperRef}
      endElement={<Icon icon={isOpen ? "expand_less" : "expand_more"} />}
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
            ...tw`h-full p-0 py-2 mx-3`,
          },
          "&__single-value": {
            ...tw`m-0 text-white`,
          },
          "&__indicators": {
            ...tw`hidden`,
          },
          "&__menu": {
            width: wrapperRef.current?.offsetWidth ?? 0,
            ...tw`bg-gray-700 text-gray-300 overflow-hidden rounded-lg`,
          },
          "&__menu-list": {
            ...tw`py-0`,
          },
          "&__menu-notice": {
            ...tw`text-gray-300`,
          },
          "&__option": {
            ...tw`text-base`,
            "&--is-focused": {
              ...tw`bg-gray-600`,
            },
            "&--is-selected": {
              ...tw`bg-blue-500`,
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
        menuIsOpen={isOpen}
        onMenuOpen={() => {
          setIsOpen(true);
          onMenuOpen?.();
        }}
        onMenuClose={() => {
          setIsOpen(false);
          onMenuClose?.();
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          wasFocused.current = true;

          setIsFocused(false);
          onBlur?.(event);
        }}
        {...props}
      />
    </Field>
  );
}

export default SelectInput;
