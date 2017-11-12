const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const TslintWebpackPlugin = require("tslint-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/index.tsx",
		styles: "bootstrap-loader",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].[chunkhash].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
			},
			{
				test: /\.tsx?$/,
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
	plugins: [
		new ExtractTextPlugin("[name].[contenthash].css"),
		new HtmlWebpackPlugin({
			template: "src/index.html",
		}),
		new StylelintWebpackPlugin(),
		new TslintWebpackPlugin({
			files: ["src/**/*.ts", "src/**/*.tsx"],
		}),
		new webpack.DefinePlugin({
			env: {
				development: process.env.DEVELOPMENT === "true" || false,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module) {
				return (
					module.context &&
					module.context.indexOf("node_modules") >= 0 &&
					!/(bootstrap|css|style)-loader/.test(module.context)
				);
			},
		}),
	],
};
