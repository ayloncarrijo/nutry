import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import React from "react";
import type { AppPage } from "types";
import type { Diet } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialState: {
    goalDiet: Diet;
  };
}

const Page: AppPage<PageProps> = ({ initialState }) => {
  const [goalDiet, setGoalDiet] = React.useState(initialState.goalDiet);

  return (
    <Container>
      <DietViewer diet={goalDiet} onDietChange={setGoalDiet} />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  ([{ user }]) =>
    async () => {
      const { data: goalDiet } = await Api.MAIN.get<Diet>(
        `/diets/${user.goalDietId}`
      );

      const props: PageProps = {
        initialState: {
          goalDiet,
        },
      };

      return {
        props,
      };
    }
);
export default Page;
