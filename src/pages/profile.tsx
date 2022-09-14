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

  return (
    <Container>
      <form>
        <TextInput
          label="Peso"
          type="number"
          required
          value={String(weight)}
          onValueChange={(value) => setWeight(Number(value))}
        />
      </form>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
