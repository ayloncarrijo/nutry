import type { GetServerSideProps } from "next";

type MiddlewareProps<
  T extends Array<GetServerSideProps> | [GetServerSideProps]
> = {
  [Index in keyof T]: UnwrapProps<T[Index]>;
};

type UnwrapProps<T extends GetServerSideProps> = T extends GetServerSideProps<
  infer Props
>
  ? Props
  : never;

class NextUtil {
  public static mergeGssp<
    T extends Array<GetServerSideProps> | [GetServerSideProps]
  >(
    middlewares: T,
    gsspGetter?: (props: MiddlewareProps<T>) => GetServerSideProps
  ): GetServerSideProps {
    return async (context) => {
      const middlewareResults = await Promise.all(
        middlewares.map((middleware) => middleware(context))
      );

      const failedResult = middlewareResults.find(
        (result) => !("props" in result)
      );

      if (failedResult) {
        return failedResult;
      }

      const middlewareProps = await Promise.all(
        middlewareResults.map((result) => {
          if (!("props" in result)) {
            throw new Error("The result doesn't contain props.");
          }

          return result.props;
        })
      );

      const unifiedMiddlewareProps = middlewareProps.reduce(
        (accumulator, props) => ({
          ...accumulator,
          ...props,
        }),
        {}
      );

      if (!gsspGetter) {
        return {
          props: unifiedMiddlewareProps,
        };
      }

      const gsspResult = await gsspGetter(
        middlewareProps as MiddlewareProps<T>
      )(context);

      if (!("props" in gsspResult)) {
        return gsspResult;
      }

      return {
        props: {
          ...unifiedMiddlewareProps,
          ...(await gsspResult.props),
        },
      };
    };
  }
}

export type { UnwrapProps };
export default NextUtil;
