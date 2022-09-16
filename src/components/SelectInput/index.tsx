import Field, { FieldProps } from "components/Field";
import React from "react";
import Select, { GroupBase, Props, SelectInstance } from "react-select";

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
      {...props}
    >
      <Select<Option, IsMulti, Group>
        ref={selectRef}
        id={id}
        instanceId={id}
        placeholder=""
        className="react-select"
        classNamePrefix="react-select"
        openMenuOnFocus
        noOptionsMessage={() => "Oops... Nenhuma opção encontrada."}
        isSearchable
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
