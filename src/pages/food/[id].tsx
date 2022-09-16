import Container from "components/Container";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import type { AppPage } from "types";
import type { Food } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  food: Food;
}

type Query = {
  id: string;
};

const Page: AppPage<PageProps> = ({ food }) => {
  return (
    <Container>
      <div>{JSON.stringify(food)}</div>
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
