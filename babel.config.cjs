module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-syntax-import-meta"],
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/babel-plugin-transform-import-meta"]
  ]
}
