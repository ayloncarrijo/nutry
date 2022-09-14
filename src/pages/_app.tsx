import GlobalStyles from "components/GlobalStyles";
import type { AuthenticateProps } from "middlewares/authenticate";
import UserProvider from "providers/UserProvider";
import type {} from "styled-components/cssprop";
import type { AppPage } from "types";

type AppProps = {
  Component: AppPage;
  pageProps: PageProps;
};

type PageProps = Partial<AuthenticateProps>;

function App({ Component, pageProps }: AppProps) {
  const { getLayout } = Component;

  const { user } = pageProps;

  return (
    <>
      <GlobalStyles />
      <UserProvider value={user}>
        {getLayout(<Component {...pageProps} />)}
      </UserProvider>
    </>
  );
}

export default App;
