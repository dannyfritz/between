module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
}
