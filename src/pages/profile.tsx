import Button from "components/Button";
import Container from "components/Container";
import TextInput from "components/TextInput";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import { useUser } from "providers/UserProvider";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";

const Page: AppPage = () => {
  const user = useUser();

  const [weight, setWeight] = React.useState(user.weight);

  const [carbohydratesPerKg, setCarbohydratesPerKg] = React.useState(
    user.carbohydratesPerKg
  );

  const [fatsPerKg, setFatsPerKg] = React.useState(user.fatsPerKg);

  const [proteinsPerKg, setProteinsPerKg] = React.useState(user.proteinsPerKg);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={submit}>
        <div tw="grid grid-cols-12 gap-4">
          <div tw="col-span-6">
            <TextInput
              required
              label="Peso"
              type="number"
              value={String(weight)}
              onValueChange={(value) => setWeight(Number(value))}
            />
          </div>

          <div tw="col-span-6">
            <TextInput
              required
              label="Carboidrato/Kilo"
              type="number"
              value={String(carbohydratesPerKg)}
              onValueChange={(value) => setCarbohydratesPerKg(Number(value))}
            />
          </div>

          <div tw="col-span-6">
            <TextInput
              required
              label="Gordura/Kilo"
              type="number"
              value={String(fatsPerKg)}
              onValueChange={(value) => setFatsPerKg(Number(value))}
            />
          </div>

          <div tw="col-span-6">
            <TextInput
              required
              label="Proteína/Kilo"
              type="number"
              value={String(proteinsPerKg)}
              onValueChange={(value) => setProteinsPerKg(Number(value))}
            />
          </div>
        </div>

        <div tw="mt-4 flex justify-end">
          <Button type="submit" startIcon="done">
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
