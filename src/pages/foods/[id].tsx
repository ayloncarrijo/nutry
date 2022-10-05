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
            .then(() => {
              setSubmitStatus(Status.SUCCESS);
              back();
              void SwalUtil.fireSuccess("Informações editadas com sucesso!");
            })
            .catch(() => {
              setSubmitStatus(Status.ERROR);
              void SwalUtil.fireError();
            });
        }}
        onDelete={() => {
          setDeleteStatus(Status.LOADING);

          Api.MAIN.delete(`/foods/${food.id}`)
            .then(() => {
              setDeleteStatus(Status.SUCCESS);
              back();
              void SwalUtil.fireSuccess(
                "O ingrediente foi deletado com sucesso!"
              );
            })
            .catch(() => {
              setDeleteStatus(Status.ERROR);
              void SwalUtil.fireError();
            });
        }}
      />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp([
  authenticate,
  async (context) => {
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

    const props: Pick<PageProps, "food"> = {
      food,
    };

    return {
      props,
    };
  },
]);
export default Page;
