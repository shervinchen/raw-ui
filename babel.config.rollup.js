const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  '@babel/preset-typescript',
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
    },
  ],
];

const plugins = ['styled-jsx/babel'];

module.exports = { presets, plugins };
