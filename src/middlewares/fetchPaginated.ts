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
  queryKeys?: {
    search: string;
    page: string;
  };
}

const fetchPaginated: <T>(
  options: Options
) => GetServerSideProps<FetchPaginatedProps<T>> =
  <T>({
    url,
    limit,
    params,
    queryKeys = { search: "search", page: "page" },
  }: Options) =>
  async (context) => {
    const currentPage = Math.max(1, Number(context.query[queryKeys.page]) || 1);

    const {
      data: [maximumPage, data],
    } = await Api.MAIN.get<Paginated<T>>(url, {
      params: {
        limit,
        page: currentPage,
        search: context.query[queryKeys.search],
        ...params,
      },
    });

    const resolvedUrl = context.resolvedUrl.split("?")[0] ?? "";

    if (maximumPage > 0 && currentPage > maximumPage) {
      return {
        redirect: {
          destination: `${resolvedUrl}?${String(
            new URLSearchParams({
              ...context.query,
              ...params,
              [queryKeys.page]: String(maximumPage),
            } as Record<string, string>)
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
