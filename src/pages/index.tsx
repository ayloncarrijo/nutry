import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import fetchPaginated, {
  FetchPaginatedProps,
} from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import FoodsProvider from "providers/FoodsProvider";
import RecipesProvider from "providers/RecipesProvider";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";
import type { Diet, Food, Recipe } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialState: {
    dailyDiet: Diet;
  };
  paginatedFoods: FetchPaginatedProps<Food>;
  paginatedRecipes: FetchPaginatedProps<Recipe>;
}

const Page: AppPage<PageProps> = ({
  initialState,
  paginatedFoods,
  paginatedRecipes,
}) => {
  const [dailyDiet, setDailyDiet] = React.useState(initialState.dailyDiet);

  return (
    <Container>
      <FoodsProvider {...paginatedFoods}>
        <RecipesProvider {...paginatedRecipes}>
          <DietViewer
            title="Ingestão diária"
            diet={dailyDiet}
            onDietChange={setDailyDiet}
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
          limit: Number.MAX_SAFE_INTEGER,
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
          limit: Number.MAX_SAFE_INTEGER,
          params: { createdBy: user.name },
          queryKeys: {
            search: "recipeSearch",
            page: "recipePage",
          },
        }),
      },
      async () => {
        const { data: dailyDiet } = await Api.MAIN.get<Diet>(
          `/diets/${user.dailyDietId}`
        );

        const props: Pick<PageProps, "initialState"> = {
          initialState: {
            dailyDiet,
          },
        };

        return {
          props,
        };
      },
    ])
);
export default Page;
