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
    }]],
    plugins: [['styled-components', { ssr: true }]],
  };
};
