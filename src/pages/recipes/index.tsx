import Container from "components/Container";
import RecipeViewer from "components/RecipeViewer";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import RecipesProvider from "providers/RecipesProvider";
import "twin.macro";
import type { AppPage } from "types";
import type { Recipe } from "types/api";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<Recipe>;

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  queryKeys,
  data,
}) => {
  return (
    <Container>
      <RecipesProvider
        maximumPage={maximumPage}
        currentPage={currentPage}
        queryKeys={queryKeys}
        data={data}
      >
        <RecipeViewer>
          {(card, recipe) => (
            <Link
              href={{
                pathname: "/recipes/[id]",
                query: {
                  id: recipe.id,
                },
              }}
            >
              <a>{card}</a>
            </Link>
          )}
        </RecipeViewer>
      </RecipesProvider>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp(
  [authenticate],
  ([{ user }]) =>
    fetchPaginated({
      url: "/recipes",
      limit: Number.MAX_SAFE_INTEGER,
      params: { createdBy: user.name },
    })
);
export default Page;
