import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: [".next/**", "node_modules/**"] },
  ...coreWebVitals,
  ...typescript,
  {
    // Inherited template code: surface these as warnings rather than block CI.
    // Tighten to "error" as the code is rewritten.
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    // require() is the standard Tailwind plugin-loading pattern.
    files: ["**/*.config.{ts,mts,cts,js,mjs,cjs}"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];
