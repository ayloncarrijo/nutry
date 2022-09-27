import Container from "components/Container";
import RecipeForm from "forms/RecipeForm";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import type { AppPage } from "types";
import type { Food } from "types/api";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<Food>;

const Page: AppPage<PageProps> = ({ maximumPage, currentPage, data }) => {
  return (
    <Container>
      <RecipeForm paginatedFoods={{ maximumPage, currentPage, data }} />
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp([
  authenticate,
  fetchPaginated({ url: "/foods", limit: 8 }),
]);
export default Page;
