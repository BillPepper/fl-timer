const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/timer.ts"],
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
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/i,
        use: ["ts-loader"],
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./res/favicon.ico", to: "favicon.ico" },
        { from: "./src/index.html", to: "index.html" },
        { from: "./res/alarm.mp3", to: "alarm.mp3" }
      ],
    }),
  ],
};
