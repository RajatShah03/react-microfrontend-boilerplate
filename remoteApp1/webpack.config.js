const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.png|\.svg|\.jpe?g|\.ttf|\.gif|\.eot|\.woff $/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot|gif)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', 
          options: 
          { injectType: 'styleTag' } },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: true,
            },
          },
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp1",
      filename: "remoteEntry.js",
      remotes: {
        hostApp: "hostApp@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Button": "./src/exports/Button",
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: [
        {
          ...deps,
          react: {
            // eager: true,
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            // eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: "header",
      filename: "header.js",
      exposes: {
        // "./start": "./src/header.appjsx",
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: [
        {
          ...deps,
          react: {
            // eager: true,
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            // eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: "footer",
      filename: "footer.js",
      exposes: {
        // "./start": "./src/components/app.jsx",
      },
      // sharing code based on the installed version, to allow for multiple vendors with different versions
      shared: [
        {
          ...deps,
          react: {
            // eager: true,
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            // eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
