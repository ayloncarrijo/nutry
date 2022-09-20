import Api from "lib/api";
import type { GetServerSideProps } from "next";
import type { Paginated } from "types/api";

interface FetchPaginatedProps<T> {
  maximumPage: number;
  currentPage: number;
  data: Array<T>;
}

interface Options {
  url: string;
  limit: number;
  params?: Record<string, string>;
}

const fetchPaginated: <T>(
  options: Options
) => GetServerSideProps<FetchPaginatedProps<T>> =
  <T>({ url, limit, params }: Options) =>
  async (context) => {
    const currentPage = Math.max(1, Number(context.query.page) || 1);

    const {
      data: [maximumPage, data],
    } = await Api.MAIN.get<Paginated<T>>(url, {
      params: {
        limit,
        page: currentPage,
        search: context.query.search,
        ...params,
      },
    });

    if (maximumPage > 0 && currentPage > maximumPage) {
      return {
        redirect: {
          destination: `${url}?${String(
            new URLSearchParams({
              ...context.query,
              ...params,
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

export type { FetchPaginatedProps };
export default fetchPaginated;
