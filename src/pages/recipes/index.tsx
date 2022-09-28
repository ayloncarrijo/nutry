import Button from "components/Button";
import Container from "components/Container";
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
import { FullRecipe, Measurement } from "types/api";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<FullRecipe>;

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  data: recipes,
}) => {
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
        <SnackList>
          {recipes.map((recipe) => (
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
                    measurement={Measurement.UN}
                    proportion={1}
                    cardProps={{ isHoverable: true }}
                    {...recipe}
                  />
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
