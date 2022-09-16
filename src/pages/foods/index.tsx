import Button from "components/Button";
import Container from "components/Container";
import FoodCard from "components/FoodCard";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import "twin.macro";
import type { AppPage } from "types";
import type { Food, Paginated } from "types/api";
import NextUtil from "utils/NextUtil";

interface PageProps {
  maximumPage: number;
  currentPage: number;
  foods: Array<Food>;
}

const Page: AppPage<PageProps> = ({ maximumPage, currentPage, foods }) => {
  const { pathname, replace } = useRouter();

  return (
    <Container>
      <div tw="mb-4">
        <Link href="/food/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!foods.length ? (
        <MessageBox>
          <p>Ainda não há comidas registradas.</p>
        </MessageBox>
      ) : (
        <ul tw="grid grid-cols-3 gap-4">
          {foods.map((food) => (
            <li key={food.id}>
              <Link
                href={{
                  pathname: "/food/[id]",
                  query: {
                    id: food.id,
                  },
                }}
              >
                <a>
                  <FoodCard food={food} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {maximumPage > 1 && (
        <div tw="mt-4 flex justify-center">
          <Pagination
            maximumPage={maximumPage}
            currentPage={currentPage}
            onPageChange={(page) => {
              void replace({
                query: {
                  page,
                },
                pathname,
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
    const currentPage = Number(context.query.page ?? 1);

    if (currentPage < 1 || Number.isNaN(currentPage)) {
      return {
        redirect: {
          destination: `/foods`,
          permanent: false,
        },
      };
    }

    const {
      data: [maximumPage, foods],
    } = await Api.MAIN.get<Paginated<Food>>("/foods", {
      params: {
        limit: 1,
        page: currentPage,
      },
    });

    if (maximumPage > 0 && currentPage > maximumPage) {
      return {
        redirect: {
          destination: `/foods?page=${maximumPage}`,
          permanent: false,
        },
      };
    }

    const props: PageProps = {
      maximumPage,
      currentPage,
      foods,
    };

    return {
      props,
    };
  }
);
export default Page;
