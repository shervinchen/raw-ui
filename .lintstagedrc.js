module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --cache --fix',
    'prettier --write --ignore-unknown',
  ],
  '*.{json,md,mdx,html,css}': 'prettier --write --ignore-unknown',
};
