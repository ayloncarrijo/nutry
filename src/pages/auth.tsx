import Button from "components/Button";
import TextInput from "components/TextInput";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React from "react";
import "twin.macro";
import type { AppPage } from "types";

const Page: AppPage = () => {
  const [name, setName] = React.useState("");

  const { push } = useRouter();

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();

    setCookie(null, "userName", name, {
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    void push("/");
  };

  return (
    <div tw="min-h-screen flex justify-center items-center">
      <form tw="w-full max-w-xs" onSubmit={signIn}>
        <TextInput
          required
          label="Usuário"
          value={name}
          onValueChange={setName}
        />

        <div tw="mt-2">
          <Button type="submit" startIcon="login" isFullWidth>
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
