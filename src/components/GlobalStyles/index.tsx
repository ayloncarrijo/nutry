import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle({
  body: {
    fontFamily: "Roboto",
    ...tw`text-gray-300 bg-gray-900`,
  },
  table: {
    "th, td": {
      ...tw`p-0`,
    },
    th: {
      ...tw`font-medium text-left`,
    },
  },
  ".material-symbols-outlined": {
    "&.outlined": {
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
    },
    "&.filled": {
      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
    },
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
