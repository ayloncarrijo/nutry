import { Measurement } from "@prisma/client";
import Button from "components/Button";
import Divider from "components/Divider";
import NumericInput from "components/NumericInput";
import SelectInput from "components/SelectInput";
import TextInput from "components/TextInput";
import React from "react";
import "twin.macro";
import { Status } from "types";
import type { Food, NotCreated } from "types/api";

interface FoodFormProps {
  initialData?: Food;
  status: Status;
  onSubmit: (food: NotCreated<Food>) => void;
}

function FoodForm({
  initialData,
  status,
  onSubmit,
}: FoodFormProps): JSX.Element {
  const [name, setName] = React.useState(initialData?.name ?? "");

  const [measurement, setMeasurement] = React.useState<{
    value: Measurement;
    label: Measurement;
  } | null>(
    initialData?.measurement
      ? {
          value: initialData.measurement,
          label: initialData.measurement,
        }
      : {
          value: Measurement.G,
          label: Measurement.G,
        }
  );

  const [proportion, setProportion] = React.useState(
    initialData?.proportion ?? 0
  );

  const [carbohydrates, setCarbohydrates] = React.useState(
    initialData?.carbohydrates ?? 0
  );

  const [fats, setFats] = React.useState(initialData?.fats ?? 0);

  const [proteins, setProteins] = React.useState(initialData?.proteins ?? 0);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!measurement) {
          return;
        }

        onSubmit({
          name,
          measurement: measurement.value,
          proportion,
          carbohydrates,
          fats,
          proteins,
        });
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
            id="measurement"
            label="Medida"
            value={measurement}
            onChange={setMeasurement}
            isRequired
            options={[
              ...Object.values(Measurement).map((value) => ({
                value,
                label: value,
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
        <Button
          isLoading={status === Status.LOADING}
          type="submit"
          startIcon={initialData ? "check" : "add"}
        >
          {initialData ? "Salvar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
}

export default FoodForm;
