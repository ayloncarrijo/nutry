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
import React from "react";
import { AppPage, Status } from "types";
import type { Food, Recipe } from "types/api";
import NextUtil from "utils/NextUtil";
import SwalUtil from "utils/SwalUtil";

type PageProps = FetchPaginatedProps<Food> & {
  recipe: Recipe;
};

type Query = {
  id: string;
};

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  queryKeys,
  data: foods,
  recipe,
}) => {
  const [submitStatus, setSubmitStatus] = React.useState(Status.IDLE);

  const [deleteStatus, setDeleteStatus] = React.useState(Status.IDLE);

  const { back } = useRouter();

  return (
    <Container>
      <FoodsProvider
        maximumPage={maximumPage}
        currentPage={currentPage}
        queryKeys={queryKeys}
        data={foods}
      >
        <RecipeForm
          initialData={recipe}
          submitStatus={submitStatus}
          deleteStatus={deleteStatus}
          onSubmit={(data) => {
            const createdFoods = data.attachedFoods.filter(
              (attachedFood) =>
                !recipe.attachedFoods.some(
                  (attachedFood2) => attachedFood2.id === attachedFood.id
                )
            );

            const deletedFoods = recipe.attachedFoods.filter(
              (attachedFood) =>
                !data.attachedFoods.some(
                  (attachedFood2) => attachedFood2.id === attachedFood.id
                )
            );

            const existingFoods = data.attachedFoods.filter((attachedFood) =>
              recipe.attachedFoods.some(
                (attachedFood2) => attachedFood2.id === attachedFood.id
              )
            );

            setSubmitStatus(Status.LOADING);

            Promise.all([
              Api.MAIN.put(`/recipes/${recipe.id}`, { name: data.name }),
              ...createdFoods.map((createdFood) =>
                Api.MAIN.post("/attached-foods", {
                  quantity: createdFood.quantity,
                  foodId: createdFood.food.id,
                  recipeId: recipe.id,
                })
              ),
              ...deletedFoods.map((deletedFood) =>
                Api.MAIN.delete(`/attached-foods/${deletedFood.id}`)
              ),
              ...existingFoods.map((existingFood) =>
                Api.MAIN.put(`/attached-foods/${existingFood.id}`, existingFood)
              ),
            ])
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

            Api.MAIN.delete(`/recipes/${recipe.id}`)
              .then(() => {
                setDeleteStatus(Status.SUCCESS);
                back();
                void SwalUtil.fireSuccess(
                  "A receita foi deletada com sucesso!"
                );
              })
              .catch(() => {
                setDeleteStatus(Status.ERROR);
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
  async (context) => {
    const { id } = context.query as Query;

    const { data: recipe } = await Api.MAIN.get<Recipe | null>(
      `/recipes/${id}`
    );

    if (!recipe) {
      return {
        redirect: {
          destination: "/recipes",
          permanent: false,
        },
      };
    }

    const props: Pick<PageProps, "recipe"> = {
      recipe,
    };

    return {
      props,
    };
  },
]);
export default Page;
