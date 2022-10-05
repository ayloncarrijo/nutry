import Button from "components/Button";
import Form from "components/Form";
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

  const logIn = () => {
    setCookie(null, "userName", name, {
      maxAge: Number.MAX_SAFE_INTEGER,
    });

    void push("/");
  };

  console.log(process.env.TEST_ENV);

  return (
    <div tw="min-h-screen flex justify-center items-center">
      <Form tw="w-full max-w-xs" onSubmit={logIn}>
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
      </Form>
    </div>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
