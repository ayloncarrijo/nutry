import TextInput from "components/TextInput";
import React from "react";

function RecipeForm(): JSX.Element {
  const [name, setName] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextInput required label="Nome" value={name} onValueChange={setName} />
    </form>
  );
}

export default RecipeForm;
