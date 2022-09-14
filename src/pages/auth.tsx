import Button from "components/Button";
import AuthLayout from "layouts/AuthLayout";
import "twin.macro";
import type { AppPage } from "types";

const Page: AppPage = () => {
  // const [name, setName] = React.useState("");

  // const { push } = useRouter();

  // const signIn = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   setCookie(null, "userName", name, {
  //     maxAge: Number.MAX_SAFE_INTEGER,
  //   });

  //   push("/");
  // };

  return (
    <div tw="min-h-screen flex justify-center items-center">
      <form
        tw="w-full max-w-xs"
        onSubmit={() => {
          //
        }}
      >
        {/* <TextField
          label="Insira seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
        /> */}

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
