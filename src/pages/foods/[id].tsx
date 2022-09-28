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
import NextUtil from "utils/NextUtil";
import SwalUtil from "utils/SwalUtil";

interface PageProps {
  food: Food;
}

type Query = {
  id: string;
};

const Page: AppPage<PageProps> = ({ food }) => {
  const [submitStatus, setSubmitStatus] = React.useState(Status.IDLE);

  const [deleteStatus, setDeleteStatus] = React.useState(Status.IDLE);

  const { back } = useRouter();

  return (
    <Container>
      <FoodForm
        initialData={food}
        submitStatus={submitStatus}
        deleteStatus={deleteStatus}
        onSubmit={(data) => {
          setSubmitStatus(Status.LOADING);

          Api.MAIN.put<Food>(`/foods/${food.id}`, data)
            .then(async () => {
              setSubmitStatus(Status.SUCCESS);

              await SwalUtil.fireSuccess("Informações editadas com sucesso!");

              back();
            })
            .catch(() => {
              setSubmitStatus(Status.ERROR);

              return SwalUtil.fireError();
            });
        }}
        onDelete={() => {
          setDeleteStatus(Status.LOADING);

          Api.MAIN.delete(`/foods/${food.id}`)
            .then(async () => {
              setDeleteStatus(Status.SUCCESS);

              await SwalUtil.fireSuccess(
                "O ingrediente foi deletado com sucesso!"
              );

              back();
            })
            .catch(() => {
              setDeleteStatus(Status.ERROR);

              return SwalUtil.fireError();
            });
        }}
      />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  () => async (context) => {
    const { id } = context.query as Query;

    const { data: food } = await Api.MAIN.get<Food | null>(`/foods/${id}`);

    if (!food) {
      return {
        redirect: {
          destination: "/foods",
          permanent: false,
        },
      };
    }

    const props: PageProps = {
      food,
    };

    return {
      props,
    };
  }
);
export default Page;
