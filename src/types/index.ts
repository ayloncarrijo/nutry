import type { NextPage } from "next";

export type AppPage<
  Props = Record<string, unknown>,
  InitialProps = Props
> = NextPage<Props, InitialProps> & {
  getLayout: (page: React.ReactElement) => JSX.Element;
};
