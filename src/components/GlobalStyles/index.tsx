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
  ".material-symbols": {
    "-webkit-font-feature-settings": "'liga'",
    "-webkit-font-smoothing": "antialiased",
    fontFamily: "Material Symbols Outlined",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    textTransform: "none",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    direction: "ltr",
    "&.md": {
      fontSize: "24px",
    },
    "&.sm": {
      fontSize: "20px",
    },
    "&.outlined": {
      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
    },
    "&.filled": {
      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
    },
  },
  ".react-select.react-select": {
    ...tw`w-full h-14`,
    ".react-select": {
      "&__control": {
        ...tw`h-full bg-transparent border-none`,
        "&--is-focused": {
          ...tw`border-none shadow-none`,
        },
      },
      "&__single-value": {
        ...tw`m-0 text-white`,
      },
      "&__input-container": {
        ...tw`m-0 p-0 text-white`,
      },
      "&__value-container": {
        ...tw`h-full p-0 py-2 mx-3`,
      },
      "&__indicators": {
        ...tw`pr-3`,
      },
      "&__indicator": {
        ...tw`w-6 h-6 p-0 flex justify-center items-center text-gray-300`,
      },
      "&__indicator-separator": {
        ...tw`hidden`,
      },
      "&__menu": {
        ...tw`bg-gray-700 text-gray-300 overflow-hidden rounded-lg`,
      },
      "&__menu-list": {
        ...tw`py-0`,
      },
      "&__option": {
        ...tw`text-base`,
        "&--is-focused": {
          ...tw`bg-gray-600`,
        },
        "&--is-selected": {
          ...tw`bg-blue-500`,
        },
      },
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
