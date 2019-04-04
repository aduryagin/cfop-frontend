module.exports = (api) => {
  api.cache(true);

  return {
    presets: [['next/babel', {
      'preset-env': {
        targets: {
          browsers: ['last 1 Chrome version'],
          node: true,
        },
      },
    }], '@zeit/next-typescript/babel'],
    plugins: [['styled-components', { ssr: true }]],
  };
};
