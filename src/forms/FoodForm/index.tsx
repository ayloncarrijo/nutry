import { Measurement } from "@prisma/client";
import Button from "components/Button";
import Divider from "components/Divider";
import NumericInput from "components/NumericInput";
import SelectInput from "components/SelectInput";
import TextInput from "components/TextInput";
import React from "react";
import "twin.macro";

function FoodForm(): JSX.Element {
  const [name, setName] = React.useState("");

  const [measurement, setMeasurement] = React.useState<{
    value: Measurement;
    label: Measurement;
  } | null>({
    value: Measurement.G,
    label: Measurement.G,
  });

  const [proportion, setProportion] = React.useState(0);

  const [carbohydrates, setCarbohydrates] = React.useState(0);

  const [fats, setFats] = React.useState(0);

  const [proteins, setProteins] = React.useState(0);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div tw="grid grid-cols-12 gap-4">
        <div tw="col-span-6">
          <TextInput
            required
            label="Nome"
            value={name}
            onValueChange={setName}
          />
        </div>

        <div tw="col-span-4">
          <NumericInput
            required
            label="Proporção"
            value={proportion}
            onValueChange={({ floatValue }) => setProportion(floatValue ?? 0)}
          />
        </div>

        <div tw="col-span-2">
          <SelectInput
            isRequired
            label="Medida"
            value={measurement}
            onChange={setMeasurement}
            options={[
              ...Object.values(Measurement).map((measurement) => ({
                value: measurement,
                label: measurement,
              })),
            ]}
          />
        </div>

        <div tw="col-span-12">
          <Divider>Macronutrientes</Divider>
        </div>

        <div tw="col-span-4">
          <NumericInput
            required
            label="Carboidratos"
            value={carbohydrates}
            onValueChange={({ floatValue }) =>
              setCarbohydrates(floatValue ?? 0)
            }
          />
        </div>

        <div tw="col-span-4">
          <NumericInput
            required
            label="Gorduras"
            value={fats}
            onValueChange={({ floatValue }) => setFats(floatValue ?? 0)}
          />
        </div>

        <div tw="col-span-4">
          <NumericInput
            required
            label="Proteínas"
            value={proteins}
            onValueChange={({ floatValue }) => setProteins(floatValue ?? 0)}
          />
        </div>
      </div>

      <div tw="mt-4 flex justify-end">
        <Button type="submit" startIcon="add">
          Registrar
        </Button>
      </div>
    </form>
  );
}

export default FoodForm;
