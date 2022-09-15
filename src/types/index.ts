import type { NextApiRequest, NextPage } from "next";

export type TypedApiRequest<
  Body = Record<string, unknown>,
  Query = Partial<Record<string, string | Array<string>>>
> = Omit<NextApiRequest, "body" | "query"> & {
  body: Body;
  query: Query;
};

export type AppPage<
  Props = Record<string, unknown>,
  InitialProps = Props
> = NextPage<Props, InitialProps> & {
  getLayout: (page: React.ReactElement) => JSX.Element;
};

export enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum MacroIcon {
  CARBOHYDRATES = "electric_bolt",
  FATS = "lunch_dining",
  PROTEINS = "fitness_center",
}
