import Api from "lib/api";
import type { GetServerSideProps } from "next";
import type { Paginated } from "types/api";

interface FetchPaginatedProps<T> {
  maximumPage: number;
  currentPage: number;
  queryKeys: QueryKeys;
  data: Array<T>;
}

interface Options {
  url: string;
  limit: number;
  params?: Record<string, string>;
  queryKeys?: QueryKeys;
}

type QueryKeys = {
  search: string;
  page: string;
};

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

    if (maximumPage > 0 && currentPage > maximumPage) {
      const redirectUrl = new URL(
        context.resolvedUrl,
        "http://www.placeholder.com"
      );

      redirectUrl.searchParams.set(queryKeys.page, String(maximumPage));

      return {
        redirect: {
          destination: `${redirectUrl.pathname}${redirectUrl.search}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        maximumPage,
        currentPage,
        queryKeys,
        data,
      },
    };
  };

export type { FetchPaginatedProps, QueryKeys };
export default fetchPaginated;
