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
import SwalUtil from "utils/SwalUtil";

interface FoodFormProps {
  initialData?: Food;
  submitStatus: Status;
  deleteStatus?: Status;
  onSubmit: (food: NotCreated<Food>) => void;
  onDelete?: () => void;
}

function FoodForm({
  initialData,
  submitStatus,
  deleteStatus,
  onSubmit,
  onDelete,
}: FoodFormProps): JSX.Element {
  const isBusy =
    submitStatus === Status.LOADING || deleteStatus === Status.LOADING;

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
      <div tw="grid gap-4 grid-cols-12">
        <div tw="col-span-full md:col-span-6">
          <TextInput
            required
            label="Nome"
            value={name}
            onValueChange={setName}
          />
        </div>

        <div tw="col-span-8 md:col-span-4">
          <NumericInput
            required
            label="Proporção"
            value={proportion}
            onValueChange={({ floatValue }) => setProportion(floatValue ?? 0)}
          />
        </div>

        <div tw="col-span-4 md:col-span-2">
          <SelectInput
            id="measurement"
            label="Medida"
            value={measurement}
            onChange={setMeasurement}
            isRequired
            isSearchable={false}
            options={[
              ...Object.values(Measurement).map((value) => ({
                value,
                label: value,
              })),
            ]}
          />
        </div>

        <div tw="col-span-full">
          <Divider>Macronutrientes</Divider>
        </div>

        <div tw="col-span-full sm:col-span-4">
          <NumericInput
            required
            label="Carboidratos"
            value={carbohydrates}
            onValueChange={({ floatValue }) =>
              setCarbohydrates(floatValue ?? 0)
            }
          />
        </div>

        <div tw="col-span-full sm:col-span-4">
          <NumericInput
            required
            label="Gorduras"
            value={fats}
            onValueChange={({ floatValue }) => setFats(floatValue ?? 0)}
          />
        </div>

        <div tw="col-span-full sm:col-span-4">
          <NumericInput
            required
            label="Proteínas"
            value={proteins}
            onValueChange={({ floatValue }) => setProteins(floatValue ?? 0)}
          />
        </div>
      </div>

      <div tw="mt-4 flex gap-2 justify-end">
        {initialData && (
          <Button
            isLoading={deleteStatus === Status.LOADING}
            disabled={isBusy}
            type="button"
            variant="outlined"
            startIcon="delete_sweep"
            onClick={() => {
              void SwalUtil.confirm(
                "Você tem certeza de que deseja deletar esta comida?"
              ).then(({ isConfirmed }) => isConfirmed && onDelete?.());
            }}
          >
            Deletar
          </Button>
        )}

        <Button
          isLoading={submitStatus === Status.LOADING}
          disabled={isBusy}
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
