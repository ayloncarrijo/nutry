/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: (theme) =>
        Object.fromEntries(
          Object.entries(theme("width"))
            .map(([key, value]) => [
              [`auto-fit-${key}`, `repeat(auto-fit, minmax(${value}, 1fr))`],
              [`auto-fill-${key}`, `repeat(auto-fill, minmax(${value}, 1fr))`],
            ])
            .flat()
        ),
      gridTemplateRows: (theme) =>
        Object.fromEntries(
          Object.entries(theme("height"))
            .map(([key, value]) => [
              [`auto-fit-${key}`, `repeat(auto-fit, minmax(${value}, 1fr))`],
              [`auto-fill-${key}`, `repeat(auto-fill, minmax(${value}, 1fr))`],
            ])
            .flat()
        ),
    },
  },
};
