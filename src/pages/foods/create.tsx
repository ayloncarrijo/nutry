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
  const [submitStatus, setSubmitStatus] = React.useState(Status.IDLE);

  const { back } = useRouter();

  return (
    <Container>
      <FoodForm
        submitStatus={submitStatus}
        onSubmit={(food) => {
          setSubmitStatus(Status.LOADING);

          Api.MAIN.post<Food>("/foods", food)
            .then(async () => {
              setSubmitStatus(Status.SUCCESS);

              await SwalUtil.fireSuccess(
                "O ingrediente foi registrado com sucesso!"
              );

              back();
            })
            .catch(() => {
              setSubmitStatus(Status.ERROR);

              return SwalUtil.fireError();
            });
        }}
      />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = authenticate;
export default Page;
