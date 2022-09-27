import Container from "components/Container";
import FoodViewer from "components/FoodViewer";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import fetchPaginated, {
  FetchPaginatedProps,
} from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import PaginatedFoodsProvider from "providers/PaginatedFoodsProvider";
import "twin.macro";
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
        <FoodViewer />
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
