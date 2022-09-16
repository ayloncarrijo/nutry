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
  const [status, setStatus] = React.useState(Status.IDLE);

  const { back } = useRouter();

  return (
    <Container>
      <FoodForm
        initialData={food}
        status={status}
        onSubmit={(data) => {
          setStatus(Status.LOADING);

          Api.MAIN.put<Food>(`/foods/${food.id}`, data)
            .then(async () => {
              setStatus(Status.SUCCESS);

              await SwalUtil.fireSuccess("Informações editadas com sucesso!");

              back();
            })
            .catch(() => {
              setStatus(Status.ERROR);

              return SwalUtil.fireError();
            });
        }}
      />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.merge(
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
