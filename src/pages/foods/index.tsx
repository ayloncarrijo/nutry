import Container from "components/Container";
import FoodViewer from "components/FoodViewer";
import UserLayout from "layouts/UserLayout";
import authenticate from "middlewares/authenticate";
import fetchPaginated, {
  FetchPaginatedProps,
} from "middlewares/fetchPaginated";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import FoodsProvider from "providers/FoodsProvider";
import "twin.macro";
import type { AppPage } from "types";
import type { Food } from "types/api";
import NextUtil from "utils/NextUtil";

type PageProps = FetchPaginatedProps<Food>;

const Page: AppPage<PageProps> = ({
  maximumPage,
  currentPage,
  queryKeys,
  data,
}) => {
  const { push } = useRouter();

  return (
    <Container>
      <FoodsProvider
        maximumPage={maximumPage}
        currentPage={currentPage}
        queryKeys={queryKeys}
        data={data}
      >
        <FoodViewer
          onFoodClick={(food) => {
            void push({
              pathname: "/foods/[id]",
              query: {
                id: food.id,
              },
            });
          }}
        />
      </FoodsProvider>
    </Container>
  );
};

Page.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export const getServerSideProps: GetServerSideProps = NextUtil.mergeGssp([
  authenticate,
  fetchPaginated({ url: "/foods", limit: Number.MAX_SAFE_INTEGER }),
]);
export default Page;
