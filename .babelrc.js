module.exports = (api) => {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", { targets: { node: true } }],
    "@babel/preset-typescript",
  ];

  return { presets };
};
