import Container from "components/Container";
import FoodForm from "forms/FoodForm";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { AppPage, Status } from "types";
import type { Food } from "types/api";
import SwalUtil from "utils/SwalUtil";

const Page: AppPage = () => {
  const [status, setStatus] = React.useState(Status.IDLE);

  const { back } = useRouter();

  return (
    <Container>
      <FoodForm
        onSubmit={(food) => {
          setStatus(Status.LOADING);

          Api.MAIN.post<Food>("/foods", food)
            .then(async () => {
              setStatus(Status.SUCCESS);

              await SwalUtil.fireSuccess(
                "A comida foi registrada com sucesso!"
              );

              back();
            })
            .catch(() => {
              setStatus(Status.ERROR);

              return SwalUtil.fireError();
            });
        }}
        status={status}
      />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
