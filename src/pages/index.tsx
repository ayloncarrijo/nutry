import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import React from "react";
import type { AppPage } from "types";
import type { FullDiet } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  initialDialyDiet: FullDiet;
}

const Page: AppPage<PageProps> = ({ initialDialyDiet }) => {
  const [dailyDiet, setDailyDiet] = React.useState(initialDialyDiet);

  return (
    <Container>
      <DietViewer diet={dailyDiet} onDietChange={setDailyDiet} />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.merge(
  [authenticate],
  ([{ user }]) =>
    async () => {
      const { data: dailyDiet } = await Api.MAIN.get<FullDiet>(
        `/diets/${user.dailyDietId}`
      );

      const props: PageProps = {
        initialDialyDiet: dailyDiet,
      };

      return {
        props,
      };
    }
);
export default Page;
