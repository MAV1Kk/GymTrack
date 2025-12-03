module.exports = {
  '*.{ts,js,cjs,mjs,json,md,yml,yaml}': ['prettier --write'],
  'src/**/*.ts': ['eslint --fix'],
};
