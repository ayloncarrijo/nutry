import type { GetServerSideProps } from "next";

type Middleware = GetServerSideProps | MiddlewareWithUniqueKey;

type MiddlewareWithUniqueKey = {
  uniqueKey: PropertyKey;
  gssp: GetServerSideProps;
};

type MiddlewareProps<T extends Array<Middleware> | [Middleware]> = {
  [Index in keyof T]: UnwrapMiddlewareProps<T[Index]>;
};

type UnwrapMiddlewareProps<T extends Middleware> = T extends GetServerSideProps<
  infer Props
>
  ? Props
  : T extends MiddlewareWithUniqueKey
  ? T["gssp"] extends GetServerSideProps<infer Props>
    ? Props
    : never
  : never;

class NextUtil {
  public static mergeGssp<T extends Array<Middleware> | [Middleware]>(
    middlewares: T,
    gsspGetter?: (props: MiddlewareProps<T>) => GetServerSideProps
  ): GetServerSideProps {
    return async (context) => {
      const middlewareResults = await Promise.all(
        middlewares.map((middleware) =>
          typeof middleware === "object"
            ? middleware.gssp(context)
            : middleware(context)
        )
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
        (accumulator, props, index) => {
          const middleware = middlewares[index];

          if (!middleware) {
            throw new Error("Middleware not found.");
          }

          const uniqueKey =
            typeof middleware === "object" ? middleware.uniqueKey : null;

          return {
            ...accumulator,
            ...(uniqueKey ? { [uniqueKey]: props } : props),
          };
        },
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

export type { UnwrapMiddlewareProps as UnwrapProps };
export default NextUtil;
