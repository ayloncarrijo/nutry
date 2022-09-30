import React from "react";

function Form({
  onSubmit,
  ...props
}: React.ComponentPropsWithoutRef<"form">): JSX.Element {
  return (
    <form
      onSubmit={
        onSubmit &&
        ((event) => {
          event.preventDefault();
          event.stopPropagation();

          onSubmit(event);
        })
      }
      {...props}
    />
  );
}

export default Form;
