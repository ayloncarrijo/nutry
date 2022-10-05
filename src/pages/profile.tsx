import Button from "components/Button";
import Container from "components/Container";
import Divider from "components/Divider";
import Form from "components/Form";
import NumericInput from "components/NumericInput";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import { destroyCookie } from "nookies";
import { useUser } from "providers/UserProvider";
import React from "react";
import Swal from "sweetalert2";
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

  const logOut = () => {
    destroyCookie(null, "userName");
    window.location.href = "/auth";
  };

  const submit = () => {
    if (!weight) {
      void Swal.fire({
        icon: "warning",
        text: "O peso deve ser maior do que zero.",
      });

      return;
    }

    setStatus(Status.LOADING);

    Api.MAIN.put(`/users/${user.name}`, {
      weight,
      carbohydratesPerKg,
      fatsPerKg,
      proteinsPerKg,
    })
      .then(() => {
        setStatus(Status.SUCCESS);
        return SwalUtil.fireSuccess(
          "Os seus dados foram alterados com sucesso!"
        );
      })
      .catch(() => {
        setStatus(Status.ERROR);
        return SwalUtil.fireError();
      });
  };

  return (
    <Container>
      <Form onSubmit={submit}>
        <div tw="grid grid-cols-12 gap-4">
          <div tw="col-span-full">
            <NumericInput
              required
              label="Peso"
              value={weight}
              onValueChange={({ floatValue = 0 }) => setWeight(floatValue)}
            />
          </div>

          <div tw="col-span-full">
            <Divider>Macronutrientes por kilo</Divider>
          </div>

          <div tw="col-span-full sm:col-span-4">
            <NumericInput
              required
              label="Carboidratos"
              value={carbohydratesPerKg}
              onValueChange={({ floatValue = 0 }) =>
                setCarbohydratesPerKg(floatValue)
              }
            />
          </div>

          <div tw="col-span-full sm:col-span-4">
            <NumericInput
              required
              label="Gorduras"
              value={fatsPerKg}
              onValueChange={({ floatValue = 0 }) => setFatsPerKg(floatValue)}
            />
          </div>

          <div tw="col-span-full sm:col-span-4">
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

        <div tw="mt-4 flex gap-2 justify-end">
          <Button onClick={logOut} variant="outlined" startIcon="logout">
            Sair
          </Button>

          <Button
            isLoading={status === Status.LOADING}
            type="submit"
            startIcon="done"
          >
            Salvar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
