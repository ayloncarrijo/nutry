import Button from "components/Button";
import Container from "components/Container";
import Form from "components/Form";
import MessageBox from "components/MessageBox";
import Pagination from "components/Pagination";
import SnackCard from "components/SnackCard";
import SnackList from "components/SnackList";
import TextInput from "components/TextInput";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";
import { Measurement, Recipe } from "types/api";
import DatabaseUtil from "utils/DatabaseUtil";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<Recipe>;

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  data: recipes,
}) => {
  const { query, pathname, replace } = useRouter();

  const [search, setSearch] = React.useState(
    typeof query.search === "string" ? query.search : ""
  );

  const itemsEl = React.useMemo(
    () =>
      recipes.map((recipe) => {
        const { carbohydrates, fats, proteins } =
          DatabaseUtil.getMacrosFromSnackContainer(recipe);

        return (
          <li key={recipe.id}>
            <Link
              href={{
                pathname: "/recipes/[id]",
                query: {
                  id: recipe.id,
                },
              }}
            >
              <a>
                <SnackCard
                  caption="Receita"
                  carbohydrates={carbohydrates}
                  fats={fats}
                  proteins={proteins}
                  measurement={Measurement.UN}
                  proportion={1}
                  cardProps={{ isHoverable: true }}
                  {...recipe}
                />
              </a>
            </Link>
          </li>
        );
      }),
    [recipes]
  );

  return (
    <Container>
      <Form
        tw="mb-8"
        onSubmit={() => {
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
      </Form>

      <div tw="mb-4 flex items-center gap-2">
        <Link href="/recipes/create" passHref>
          <Button forwardedAs="a" startIcon="add">
            Registrar
          </Button>
        </Link>
      </div>

      {!recipes.length ? (
        <MessageBox>
          <p>
            {query.search
              ? "Ainda não há receitas registradas com este nome."
              : "Ainda não há receitas registradas."}
          </p>
        </MessageBox>
      ) : (
        <SnackList>{itemsEl}</SnackList>
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

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  ([{ user }]) =>
    fetchPaginated({
      url: "/recipes",
      limit: 9,
      params: { createdBy: user.name },
    })
);
export default Page;
