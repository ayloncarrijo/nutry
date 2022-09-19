import Button from "components/Button";
import Container from "components/Container";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import UserLayout from "layouts/UserLayout";
import Api from "lib/api";
import authenticate from "middlewares/authenticate";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
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
  const { query, pathname, replace } = useRouter();

  const [search, setSearch] = React.useState(
    typeof query.search === "string" ? query.search : ""
  );

  return (
    <Container>
      <form
        tw="mb-8"
        onSubmit={(event) => {
          event.preventDefault();

          void replace({
            pathname,
            query: {
              ...(search && { search }),
              page: 1,
            },
          });
        }}
      >
        <TextInput
          label="Pesquisar"
          value={search}
          onValueChange={setSearch}
          endButtons={[
            {
              icon: "search",
              type: "submit",
            },
          ]}
        />
      </form>

      <div tw="mb-4 flex items-center gap-2">
        <Link href="/foods/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!foods.length ? (
        <MessageBox>
          <p>
            {query.search
              ? "Ainda não há comidas registradas com este nome."
              : "Ainda não há comidas registradas."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>
          {foods.map((food) => (
            <li key={food.id}>
              <Link
                href={{
                  pathname: "/foods/[id]",
                  query: {
                    id: food.id,
                  },
                }}
              >
                <a>
                  <SnackCard {...food} />
                </a>
              </Link>
            </li>
          ))}
        </SnackList>
      )}

      {maximumPage > 1 && (
        <div tw="mt-4 flex justify-center">
          <Pagination
            maximumPage={maximumPage}
            currentPage={currentPage}
            onPageChange={(page) => {
              void replace({
                pathname,
                query: {
                  ...query,
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
    const currentPage = Math.max(1, Number(context.query.page) || 1);

    const {
      data: [maximumPage, foods],
    } = await Api.MAIN.get<Paginated<Food>>("/foods", {
      params: {
        limit: 12,
        page: currentPage,
        search: context.query.search,
      },
    });

    if (maximumPage > 0 && currentPage > maximumPage) {
      return {
        redirect: {
          destination: `/foods?${String(
            new URLSearchParams({
              ...context.query,
              page: String(maximumPage),
            })
          )}`,
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
