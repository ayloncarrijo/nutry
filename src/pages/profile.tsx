import Button from "components/Button";
import Container from "components/Container";
import Divider from "components/Divider";
import NumericInput from "components/NumericInput";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import { AppPage, Status } from "types";
import SwalUtil from "utils/SwalUtil";

const Page: AppPage = () => {
  const user = useUser();

  const [weight, setWeight] = React.useState(user.weight);

  const [carbohydratesPerKg, setCarbohydratesPerKg] = React.useState(
    user.carbohydratesPerKg
  );

  const [fatsPerKg, setFatsPerKg] = React.useState(user.fatsPerKg);

  const [proteinsPerKg, setProteinsPerKg] = React.useState(user.proteinsPerKg);

  const [status, setStatus] = React.useState(Status.IDLE);

  const submit = async () => {
    setStatus(Status.LOADING);

    try {
      await Api.MAIN.put(`/users/${user.name}`, {
        weight,
        carbohydratesPerKg,
        fatsPerKg,
        proteinsPerKg,
      });

      setStatus(Status.SUCCESS);
      await SwalUtil.fireSuccess("Os dados foram alterados com sucesso!");
    } catch (error) {
      setStatus(Status.ERROR);
      await SwalUtil.fireError();
    }
  };

  return (
    <Container>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <div tw="grid grid-cols-12 gap-4">
          <div tw="col-span-12">
            <NumericInput
              required
              label="Peso"
              value={weight}
              onValueChange={({ floatValue = 0 }) => setWeight(floatValue)}
            />
          </div>

          <div tw="col-span-12">
            <Divider>Macronutrientes por kilo</Divider>
          </div>

          <div tw="col-span-4">
            <NumericInput
              required
              label="Carboidratos"
              value={carbohydratesPerKg}
              onValueChange={({ floatValue = 0 }) =>
                setCarbohydratesPerKg(floatValue)
              }
            />
          </div>

          <div tw="col-span-4">
            <NumericInput
              required
              label="Gorduras"
              value={fatsPerKg}
              onValueChange={({ floatValue = 0 }) => setFatsPerKg(floatValue)}
            />
          </div>

          <div tw="col-span-4">
            <NumericInput
              required
              label="Proteínas"
              value={proteinsPerKg}
              onValueChange={({ floatValue = 0 }) =>
                setProteinsPerKg(floatValue)
              }
            />
          </div>
        </div>

        <div tw="mt-4 flex justify-end">
          <Button
            isLoading={status === Status.LOADING}
            type="submit"
            startIcon="done"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
