import Api from "lib/api";
import type { GetServerSideProps } from "next";
import type { Paginated } from "types/api";

interface FetchPaginatedDataProps<T> {
  maximumPage: number;
  currentPage: number;
  data: Array<T>;
}

interface Options {
  url: string;
  limit: number;
}

const fetchPaginatedData: <T>(
  options: Options
) => GetServerSideProps<FetchPaginatedDataProps<T>> =
  <T>({ url, limit }: Options) =>
  async (context) => {
    const currentPage = Math.max(1, Number(context.query.page) || 1);

    const {
      data: [maximumPage, data],
    } = await Api.MAIN.get<Paginated<T>>(url, {
      params: {
        limit,
        page: currentPage,
        search: context.query.search,
      },
    });

    if (maximumPage > 0 && currentPage > maximumPage) {
      return {
        redirect: {
          destination: `${url}?${String(
            new URLSearchParams({
              ...context.query,
              page: String(maximumPage),
            })
          )}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        maximumPage,
        currentPage,
        data,
      },
    };
  };

export type { FetchPaginatedDataProps };
export default fetchPaginatedData;
