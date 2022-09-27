import Container from "components/Container";
import RecipeForm from "forms/RecipeForm";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import type { FetchPaginatedProps } from "middlewares/fetchPaginated";
import fetchPaginated from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import PaginatedFoodsProvider from "providers/PaginatedFoodsProvider";
import type { AppPage } from "types";
import type { Food } from "types/api";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<Food>;

const Page: AppPage<PageProps> = ({ maximumPage, currentPage, data }) => {
  return (
    <Container>
      <PaginatedFoodsProvider
        maximumPage={maximumPage}
        currentPage={currentPage}
        data={data}
      >
        <RecipeForm />
      </PaginatedFoodsProvider>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp([
  authenticate,
  fetchPaginated({ url: "/foods", limit: 9 }),
]);
export default Page;
