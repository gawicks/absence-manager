/* config-overrides.js */

module.exports = function override(config) {
  // eslint-disable-next-line no-param-reassign
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
  };
  return config;
};
