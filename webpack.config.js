const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const TslintWebpackPlugin = require("tslint-webpack-plugin");

const config = {
	entry: {
		app: "./src/index.tsx",
		styles: "./src/index.scss",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader", "ts-loader"],
			},
			{
				test: /\.ttf$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
					},
				},
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks(chunk) {
				return chunk.name !== "styles";
			},
			cacheGroups: {
				vendor: {
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new StylelintWebpackPlugin(),
		new TslintWebpackPlugin({
			files: ["src/**/*.ts", "src/**/*.tsx"],
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				process.env.DEVELOPMENT === "true"
					? "development"
					: "production",
			),
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
};

module.exports = (env, options) => {
	if (options.mode === "development") {
		config.resolve.alias = {
			inferno: __dirname + "/node_modules/inferno/dist/index.dev.esm.js",
		};
	}

	return config;
};
