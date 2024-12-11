module.exports = {
  locales: ["mn"],
  defaultLocale: "mn",
  pages: {
    "*": ["common", "error", "auth", "account"],
  },
  interpolation: {
    prefix: "${",
    suffix: "}",
  },
};
