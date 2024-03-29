import GlobalStyles from "components/GlobalStyles";
import type { AuthenticateProps } from "middlewares/authenticate";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import DrawerProvider from "providers/DrawerProvider";
import UserProvider from "providers/UserProvider";
import "react-circular-progressbar/dist/styles.css";
import type {} from "styled-components/cssprop";
import type { AppPage } from "types";

type AppProps = {
  Component: AppPage;
  pageProps: PageProps;
};

type PageProps = Partial<AuthenticateProps>;

NProgress.configure({
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  const { getLayout = (page) => page } = Component;

  const { user } = pageProps;

  return (
    <>
      <Head>
        <title>Dieta</title>
      </Head>

      <GlobalStyles />
      <DrawerProvider>
        <UserProvider value={user}>
          {getLayout(<Component {...pageProps} />)}
        </UserProvider>
      </DrawerProvider>
    </>
  );
}

export default App;
