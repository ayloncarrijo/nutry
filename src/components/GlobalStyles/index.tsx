import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle({
  body: {
    fontFamily: "Roboto",
    ...tw`bg-red-400`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
