import Container from "components/Container";
import DietViewer from "components/DietViewer";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import type { AppPage } from "types";
import type { FullDiet } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  dailyDiet: FullDiet;
}

const Page: AppPage<PageProps> = ({ dailyDiet }) => {
  return (
    <Container>
      <DietViewer diet={dailyDiet} />
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
        dailyDiet,
      };

      return {
        props,
      };
    }
);
export default Page;
