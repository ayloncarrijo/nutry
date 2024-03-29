import { Measurement } from "@prisma/client";
import Button from "components/Button";
import Divider from "components/Divider";
import Form from "components/Form";
import NumericInput from "components/NumericInput";
import SelectInput from "components/SelectInput";
import TextInput from "components/TextInput";
import React from "react";
import Swal from "sweetalert2";
import "twin.macro";
import { Status } from "types";
import type { Food, NotCreated } from "types/api";
import ObjectUtil from "utils/ObjectUtil";
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
  const isLoading =
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

  const [proportion, setProportion] = React.useState(initialData?.proportion);

  const [carbohydrates, setCarbohydrates] = React.useState(
    initialData?.carbohydrates
  );

  const [fats, setFats] = React.useState(initialData?.fats);

  const [proteins, setProteins] = React.useState(initialData?.proteins);

  const [reference, setReference] = React.useState(
    initialData?.reference ?? ""
  );

  return (
    <Form
      onSubmit={() => {
        if (!proportion) {
          void Swal.fire({
            icon: "warning",
            text: "A proporção deve ser maior do que zero.",
          });

          return;
        }

        const formData = {
          name,
          measurement: measurement?.value,
          proportion,
          carbohydrates,
          fats,
          proteins,
          reference,
        };

        if (ObjectUtil.isAllDefined(formData)) {
          onSubmit(formData);
        }
      }}
    >
      <div tw="grid gap-4 grid-cols-12">
        <div tw="col-span-full md:col-span-6">
          <TextInput
            required
            label="Título"
            value={name}
            onValueChange={setName}
          />
        </div>

        <div tw="col-span-6 md:col-span-4">
          <NumericInput
            required
            label="Proporção"
            value={proportion}
            onValueChange={({ floatValue }) => setProportion(floatValue)}
          />
        </div>

        <div tw="col-span-6 md:col-span-2">
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
            onValueChange={({ floatValue }) => setCarbohydrates(floatValue)}
          />
        </div>

        <div tw="col-span-full sm:col-span-4">
          <NumericInput
            required
            label="Gorduras"
            value={fats}
            onValueChange={({ floatValue }) => setFats(floatValue)}
          />
        </div>

        <div tw="col-span-full sm:col-span-4">
          <NumericInput
            required
            label="Proteínas"
            value={proteins}
            onValueChange={({ floatValue }) => setProteins(floatValue)}
          />
        </div>

        <div tw="col-span-full">
          <TextInput
            label="Referência"
            value={reference}
            onValueChange={setReference}
          />
        </div>
      </div>

      <div tw="mt-4 flex gap-2 justify-end">
        {initialData && (
          <Button
            isLoading={deleteStatus === Status.LOADING}
            disabled={isLoading}
            type="button"
            variant="outlined"
            startIcon="delete"
            onClick={() => {
              void SwalUtil.confirm(
                "Você tem certeza de que deseja deletar este ingrediente?"
              ).then(({ isConfirmed }) => isConfirmed && onDelete?.());
            }}
          >
            Deletar
          </Button>
        )}

        <Button
          isLoading={submitStatus === Status.LOADING}
          disabled={isLoading}
          type="submit"
          startIcon="done"
        >
          Salvar
        </Button>
      </div>
    </Form>
  );
}

export default FoodForm;
