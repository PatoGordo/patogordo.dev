/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        "base-100": "var(--base-100)",
        "base-200": "var(--base-200)",
        "base-300": "var(--base-300)",

        ...generateColorVariants("primary"),
        ...generateColorVariants("secondary"),
        ...generateColorVariants("success"),
        ...generateColorVariants("info"),
        ...generateColorVariants("warning"),
        ...generateColorVariants("error"),
      },
    },
  },
  plugins: [],
};

/**
 * Function to generate tailwind color shade variables from 100 to 900
 *
 * @param {string} colorName Is the name of the desired color variable
 * @returns returns an object with variants from 100 to 900
 */
function generateColorVariants(colorName) {
  const variants = {
    [`${colorName}`]: `var(--${colorName})`,
  };
  for (let i = 100; i <= 900; i += 100) {
    variants[`${colorName}-${i}`] = `var(--${colorName}-${i})`;
  }
  return variants;
}
