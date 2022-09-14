import type { User } from "@prisma/client";
import Api from "lib/api";
import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

interface AuthenticateProps {
  user: User;
}

const authenticate: GetServerSideProps<AuthenticateProps> = async (context) => {
  const { userName } = parseCookies(context);

  if (!userName) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  let user = (await Api.MAIN.get<User | null>(`/users/${userName}`)).data;

  if (!user) {
    user = (await Api.MAIN.post<User>("/users", { name: userName })).data;
  }

  return {
    props: {
      user,
    },
  };
};

export type { AuthenticateProps };
export default authenticate;
