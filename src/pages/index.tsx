import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import FoodsProvider from "providers/FoodsProvider";
import RecipesProvider from "providers/RecipesProvider";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";
import type { Diet } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialState: {
    dailyDiet: Diet;
  };
}

const foodQueryKeys = {
  search: "foodSearch",
  page: "foodPage",
};

const recipeQueryKeys = {
  search: "recipeSearch",
  page: "recipePage",
};

const Page: AppPage<PageProps> = ({ initialState, ...props }) => {
  const [dailyDiet, setDailyDiet] = React.useState(initialState.dailyDiet);

  console.log(props);

  return (
    <Container>
      <FoodsProvider queryKeys={foodQueryKeys}>
        <RecipesProvider queryKeys={recipeQueryKeys}>
          <DietViewer diet={dailyDiet} onDietChange={setDailyDiet} />
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
      fetchPaginated({ url: "/foods", limit: 9, queryKeys: foodQueryKeys }),
      fetchPaginated({
        url: "/recipes",
        limit: 9,
        params: { createdBy: user.name },
        queryKeys: recipeQueryKeys,
      }),
      async () => {
        const { data: dailyDiet } = await Api.MAIN.get<Diet>(
          `/diets/${user.dailyDietId}`
        );

        const props: PageProps = {
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
