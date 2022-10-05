import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import FoodsProvider from "providers/FoodsProvider";
import RecipesProvider from "providers/RecipesProvider";
import React from "react";
import type { AppPage } from "types";
import type { Diet, Food, Recipe } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialState: {
    goalDiet: Diet;
  };
  paginatedFoods: FetchPaginatedProps<Food>;
  paginatedRecipes: FetchPaginatedProps<Recipe>;
}

const Page: AppPage<PageProps> = ({
  initialState,
  paginatedFoods,
  paginatedRecipes,
}) => {
  const [goalDiet, setGoalDiet] = React.useState(initialState.goalDiet);

  return (
    <Container>
      <FoodsProvider {...paginatedFoods}>
        <RecipesProvider {...paginatedRecipes}>
          <DietViewer
            title="Minha dieta"
            diet={goalDiet}
            onDietChange={setGoalDiet}
          />
        </RecipesProvider>
      </FoodsProvider>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  ([{ user }]) =>
    NextUtil.mergeGssp([
      {
        uniqueKey: "paginatedFoods",
        gssp: fetchPaginated({
          url: "/foods",
          limit: 9,
          queryKeys: {
            search: "foodSearch",
            page: "foodPage",
          },
        }),
      },
      {
        uniqueKey: "paginatedRecipes",
        gssp: fetchPaginated({
          url: "/recipes",
          limit: 9,
          params: { createdBy: user.name },
          queryKeys: {
            search: "recipeSearch",
            page: "recipePage",
          },
        }),
      },
      async () => {
        const { data: goalDiet } = await Api.MAIN.get<Diet>(
          `/diets/${user.goalDietId}`
        );

        const props: Pick<PageProps, "initialState"> = {
          initialState: {
            goalDiet,
          },
        };

        return {
          props,
        };
      },
    ])
);
export default Page;
