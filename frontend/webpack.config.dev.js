const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry:
    // "./src/index.js",
    {
      app: "./src/index.js",
      account: "./src/pages/Layout/Account/Account.js",
      main: "./src/pages/Layout/Main/Main.js",
      notFound: "./src/pages/Layout/NotFound/NotFound.js",
      profile: "./src/pages/Layout/Profile/Profile.js",
    },
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, `dist/development`),
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [{ from: "resources", to: "resources" }],
    }),
    new FaviconsWebpackPlugin("favicon.ico"),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: "static",
    }),
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "common_vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },
};
