const webpack = require("webpack");

module.exports = function(config) {
	config.set({
		frameworks: ["es6-shim", "jasmine"],
		reporters: ["progress"],
		files: ["src/**/*.spec.ts"],
		mime: {
			"text/x-typescript": ["ts", "tsx"],
		},
		preprocessors: {
			"**/*.spec.ts": ["webpack", "sourcemap"],
		},
		webpack: {
			resolve: {
				extensions: [".tsx", ".ts", ".js"],
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						use: ["babel-loader", "ts-loader"],
					},
				],
			},
			plugins: [
				// Partially fix source maps with Typescript:
				// https://github.com/webpack-contrib/karma-webpack/issues/109#issuecomment-224961264
				new webpack.SourceMapDevToolPlugin({
					filename: null,
					test: /\.[jt]sx?($|\?)/i,
				}),
			]
		},
	});
};
