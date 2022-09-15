import Container from "components/Container";
import FoodCard from "components/FoodCard";
import Pagination from "components/Pagination";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import "twin.macro";
import type { AppPage } from "types";
import type { Food, Paginated } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  maximumPage: number;
  foods: Array<Food>;
}

const Page: AppPage<PageProps> = ({ maximumPage, foods }) => {
  const { query, pathname, replace } = useRouter();

  const currentPage = Number(query.page);

  return (
    <Container>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <FoodCard food={food} />
          </li>
        ))}
      </ul>

      {maximumPage > 1 && (
        <div tw="mt-4 flex justify-center">
          <Pagination
            maximumPage={maximumPage}
            currentPage={currentPage}
            onPageChange={(page) => {
              void replace({
                pathname,
                query: {
                  page,
                },
              });
            }}
          />
        </div>
      )}
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.merge(
  [authenticate],
  () => async (context) => {
    const currentPage = Number(context.query.page);

    const {
      data: [maximumPage, foods],
    } = await Api.MAIN.get<Paginated<Food>>("/foods", {
      params: {
        limit: 1,
        page: currentPage,
      },
    });

    if (Number(currentPage) > maximumPage) {
      return {
        redirect: {
          destination: `/foods/${maximumPage}`,
          permanent: false,
        },
      };
    }

    const props: PageProps = {
      maximumPage,
      foods,
    };

    return {
      props,
    };
  }
);
export default Page;
