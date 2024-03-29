import Container from "components/Container";
import RecipeForm from "forms/RecipeForm";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import FoodsProvider from "providers/FoodsProvider";
import { useUser } from "providers/UserProvider";
import React from "react";
import { AppPage, Status } from "types";
import type { Food } from "types/api";
import NextUtil from "utils/NextUtil";
import SwalUtil from "utils/SwalUtil";

type PageProps = FetchPaginatedProps<Food>;

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  queryKeys,
  data,
}) => {
  const [status, setStatus] = React.useState(Status.IDLE);

  const user = useUser();

  const { back } = useRouter();

  return (
    <Container>
      <FoodsProvider
        maximumPage={maximumPage}
        currentPage={currentPage}
        queryKeys={queryKeys}
        data={data}
      >
        <RecipeForm
          submitStatus={status}
          onSubmit={({ name, attachedFoods }) => {
            setStatus(Status.LOADING);

            Api.MAIN.post("/recipes", {
              name,
              createdBy: user.name,
              attachedFoods: attachedFoods.map<{
                foodId: string;
                quantity: number;
              }>((attachedFood) => ({
                foodId: attachedFood.food.id,
                quantity: attachedFood.quantity,
              })),
            })
              .then(() => {
                setStatus(Status.SUCCESS);
                back();
                void SwalUtil.fireSuccess(
                  "A receita foi registrada com sucesso!"
                );
              })
              .catch(() => {
                setStatus(Status.ERROR);
                void SwalUtil.fireError();
              });
          }}
        />
      </FoodsProvider>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp([
  authenticate,
  fetchPaginated({ url: "/foods", limit: Number.MAX_SAFE_INTEGER }),
]);
export default Page;
