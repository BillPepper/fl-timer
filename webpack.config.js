const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/timer.js"],
  output: {
    path: __dirname + "/dist",
    filename: "timer.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./res/favicon.ico", to: "favicon.ico" },
        { from: "./src/index.html", to: "index.html" },
      ],
    }),
  ],
};
