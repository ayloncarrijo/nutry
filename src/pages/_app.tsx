import GlobalStyles from "components/GlobalStyles";
import type {} from "styled-components/cssprop";
import type { AppPage } from "types";

type AppProps = {
  Component: AppPage;
  pageProps: PageProps;
};

type PageProps = Record<string, unknown>;

function App({ Component, pageProps }: AppProps) {
  const { getLayout } = Component;

  return (
    <>
      <GlobalStyles />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default App;
