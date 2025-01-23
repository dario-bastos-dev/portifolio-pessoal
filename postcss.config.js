export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
  cssnano: {
    preset: [
      'default',
      { discardComments: { removeAll: true }, normalizeWhitespace: false },
    ],
    debug: true,
  },
};
